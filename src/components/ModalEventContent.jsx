import React from "react";
import "../styles/Modal.css";
import ColorBox from "./ColorBox";
import UserBubble from "./UserBubble";
import { allowedColors, smallImagesArray, checkMonthIndex } from "../utils/utils";
import globals from "../utils/globals";
import api from "../api/api";
import dayjs from "dayjs";

export default function ModalEventContent(props) {
    const [modalData, setModelData] = React.useState(getModalContent(props.eventID))
    const [isUpdateClicked, setIsUpdateClicked] = React.useState(false)
    const [formData, setFormData] = React.useState({
        startDate: modalData.start_time,
        endDate: modalData.end_time,
        eventType: modalData.type_id - 1, // TODO: hardcoded
        shortDescription: modalData.short_description,
        longDescription: modalData.long_description,
        userID: modalData.user_id - 3, // TODO: hardcoded
        imageURL: modalData.img,
        name: modalData.name
    })
    const [errorMessage, setErrorMessage] = React.useState("")

    const colorBoxes = allowedColors.map((color,idx) => {
        return <ColorBox
            key={idx}
            color={color}
            _id={idx}
            handleClick={handleColorBoxClick}
            isClicked={idx == formData.eventType ? true : false}
            />
    })

    const userBubbles = smallImagesArray.map((img, idx) => {
        return <UserBubble
            key={idx}
            img={img}
            _id={idx}
            handleClick={handleUserBubbleClick}
            isClicked={idx == formData.userID ? true : false}
            />
    })

    function handleColorBoxClick(colorBoxID) {
        setFormData(prevFormData => ({
            ...prevFormData,
            eventType: colorBoxID
        }))
    }

    function handleUserBubbleClick(userBubbleID) {
        setFormData(prevFormData => ({
            ...prevFormData,
            userID: userBubbleID
        }))
    }

    function getModalContent(eventID) {
        for(let idx=0; idx < globals.events.length; idx++) {
            if(globals.events[idx].id == eventID)
            {
                return globals.events[idx]
            }
        }
        return undefined
    }

    function findArrayID() {
        for(let idx=0; idx < globals.events.length; idx++) {
            if(globals.events[idx].id == props.eventID)
            {
                return idx
            }
        }
        return undefined
    }

    function deleteEvent() {
        globals.events.splice(findArrayID(), 1)
        api.deleteEvent(props.eventID)
        props.notifyEventUpdate()
        props.toggleModal()
    }

    function handleColorBoxClick(colorBoxID) {
        setFormData(prevFormData => ({
            ...prevFormData,
            eventType: colorBoxID
        }))
    }

    function handleUserBubbleClick(userBubbleID) {
        setFormData(prevFormData => ({
            ...prevFormData,
            userID: userBubbleID
        }))
    }

    // returns true if everything is ok
    function _validateForm() {
        if(!formData.startDate) {
            setErrorMessage("Start date cannot be empty")
            return false
        }
        
        if(!formData.endDate) {
            setErrorMessage("End date cannot be empty")
            return false
        }

        const startDate = new Date(formData.startDate)
        const endDate = new Date(formData.endDate)

        if (startDate > endDate) {
            setErrorMessage("Start date cannot be greater than end date")
            return false
        }
        
        if(formData.name == "") {
            setErrorMessage("Event name cannot be empty")
            return false
        }
        setErrorMessage("")
        return true
    }

    function _areStartDateAndEndDateInTheSameMonth() {
        const startMonth = new Date(formData.startDate).getMonth()
        const endMonth = new Date(formData.endDate).getMonth()
        if(startMonth == endMonth)
            return true
        return false
    }

    function handleSubmit(event) {
        event.preventDefault()
        if(_validateForm()){
            
            let data = {
                id: props.eventID,
                user_id: formData.userID + 3,
                name: formData.name,
                start_time: formData.startDate,
                end_time: formData.endDate,
                short_description: formData.shortDescription,
                long_description: formData.longDescription,
                image: "img url",
                image_description: "img url",
                type_id: formData.eventType + 1
            }

            globals.events.splice(findArrayID(), 1)

            api.updateEvent(data)

            if(_areStartDateAndEndDateInTheSameMonth()) {
                // check if recent data should be updated in case data is in current month
                const startMonth = new Date(formData.startDate).getMonth()

                if((checkMonthIndex(globals.currentMonthIndex) - 1) == startMonth){
                    globals.events.push(data)
                }
            }
            else {
                const start_time = dayjs(new Date(formData.startDate))
                const end_time = dayjs(new Date(formData.endDate))
                let start_year = start_time.year()
                let end_year = end_time.year()
                let start_month = start_time.month()
                let end_month = end_time.month()
                
                while(!((start_year == end_year) && (start_month == end_month + 1)))
                {
                    let curr = dayjs(new Date(start_year, start_month))
                    if(curr.year() == start_time.year() && curr.month() == start_time.month())
                    {
                        if(curr.year() == globals.currentYear && curr.month() == checkMonthIndex(globals.currentMonthIndex) - 1){
                            let month_end = dayjs(new Date(start_year, start_month + 1, 0, 23, 59, 59)).format('YYYY-MM-DDTHH:mm:ss')
                            data.start_time = formData.startDate
                            data.end_time = month_end
                            globals.events.push(data)
                            break;
                        }
                    }
                    else if (curr.year() == end_year && curr.month() == end_month)
                    {
                        if(curr.year() == globals.currentYear && curr.month() == checkMonthIndex(globals.currentMonthIndex) - 1) {
                            let month_start = dayjs(new Date(start_year, start_month, 1, 0, 0, 1)).format('YYYY-MM-DDTHH:mm:ss')
                            data.start_time = month_start
                            data.end_time = formData.endDate
                            globals.events.push(data)
                            break;
                        }
                    }
                    else {
                        if(curr.year() == globals.currentYear && curr.month() == checkMonthIndex(globals.currentMonthIndex) - 1) {
                            let month_end = dayjs(new Date(start_year, start_month + 1, 0, 23, 59, 59)).format('YYYY-MM-DDTHH:mm:ss')
                            let month_start = dayjs(new Date(start_year, start_month, 1, 0, 0, 1)).format('YYYY-MM-DDTHH:mm:ss')
                            data.start_time = month_start
                            data.end_time = month_end
                            globals.events.push(data)
                            break;
                        }
                    }
                    
                    if(start_month == 11)
                    {
                        start_year++
                        start_month = 0
                    }
                    else
                    {
                        start_month++
                    }
                }
            }
            props.notifyEventUpdate()
            props.toggleModal()
        }
    }

    function handleFormChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    return (
        <div className="modal">
            <div className="overlay" onClick={props.toggleModal}></div>
            <div className="modal-content">
                {isUpdateClicked
                ?
                // Update Start
                <form onSubmit={handleSubmit}>
                    <h2>Update Event</h2>
                    <input
                        type="text"
                        placeholder="Event name"
                        className="form-input"
                        onChange={handleFormChange}
                        name="name"
                        value={formData.name}
                    />
                    <span>Start time</span>
                    <input
                        type="datetime-local"
                        className="form-input"
                        onChange={handleFormChange}
                        name="startDate"
                        defaultValue={formData.startDate}
                    />
                    <span>End time</span>
                    <input
                        type="datetime-local"
                        className="form-input"
                        onChange={handleFormChange}
                        name="endDate"
                        defaultValue={formData.endDate}
                    />
                    <input
                        type="text"
                        placeholder="Event short description"
                        className="form-input"
                        onChange={handleFormChange}
                        name="shortDescription"
                        value={formData.shortDescription}
                    />
                    <textarea
                        placeholder="Event long description"
                        onChange={handleFormChange}
                        name="longDescription"
                        value={formData.longDescription}
                    />
                    <span id="color-span">Choose color</span>
                    <div className="div-boxesContainer">
                        {colorBoxes}
                    </div>
                    <span id="color-span">Choose user</span>
                    <div className="div-boxesContainer">
                        {userBubbles}
                    </div>
                    <h4 className="warning-h4">{errorMessage}</h4>
                    <button className="form-button">Update</button>
                </form>
                :
                // Event visualization 
                <>
                    <div className="picture-description-holder">
                        <img className="modal-picture" src={smallImagesArray[modalData.user_id - 3]}/>
                        <div>
                            <h3>{modalData.name}</h3>
                            <span>{modalData.short_description}</span>
                        </div>
                    </div>
                    <span>{modalData.long_description}</span>
                    {props.isUserLoggedIn && <div className="modal-buttons">
                        <button onClick={deleteEvent}>Delete</button>
                        <button id="modal-update-button" onClick={() => {setIsUpdateClicked(true)}}>Update</button>
                    </div>
                    }
                </>
            }
                <button className="close-modal" onClick={props.toggleModal}>X</button>
            </div>
        </div>
    )
}
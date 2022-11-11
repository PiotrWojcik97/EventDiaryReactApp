import React from "react";
import "../styles/Modal.css";
import exampleData from "../utils/data";
import ColorBox from "./ColorBox";
import UserBubble from "./UserBubble";
import { allowedColors, smallImagesArray } from "../utils/utils";
import globals from "../utils/globals";
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
        for(let idx=0; idx < exampleData.data.length; idx++) {
            if(exampleData.data[idx].id == eventID)
            {
                return exampleData.data[idx]
            }
        }
        return undefined
    }

    function findArrayID() {
        for(let idx=0; idx < exampleData.data.length; idx++) {
            if(exampleData.data[idx].id == props.eventID)
            {
                return idx
            }
        }
        return undefined
    }

    function deleteEvent() {
        exampleData.data.splice(findArrayID(), 1)
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

    function _areStartDateAndEndDateInCurrentMonth(currentMonth) {
        const startMonth = new Date(formData.startDate).getMonth() + 1
        const endMonth = new Date(formData.endDate).getMonth() + 1
        if(currentMonth == startMonth && currentMonth == endMonth)
            return true
        return false
    }

    function handleSubmit(event) {
        event.preventDefault()
        if(_validateForm()){

        if(_areStartDateAndEndDateInCurrentMonth(globals.currentMonthIndex)) {

                for(let i=0; i<exampleData.data.length; i++)
                {
                    if(exampleData.data[i].id == props.eventID)
                    {
                        exampleData.data[i].user_id = formData.userID + 3, //TODO: hardcoded
                        exampleData.data[i].name = formData.name,
                        exampleData.data[i].start_time = formData.startDate,
                        exampleData.data[i].end_time = formData.endDate,
                        exampleData.data[i].short_description = formData.shortDescription,
                        exampleData.data[i].long_description = formData.longDescription,
                        exampleData.data[i].img = "img url",
                        exampleData.data[i].type_id = formData.eventType + 1 //TODO: hardcoded
                        break
                    }
                }
                // sent data to database with async here
            }
            else {
                // divide algorithm from utils here
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
                    <div className="modal-buttons">
                        <button onClick={deleteEvent}>Delete</button>
                        <button id="modal-update-button" onClick={() => {setIsUpdateClicked(true)}}>Update</button>
                    </div>
                </>
            }
                <button className="close-modal" onClick={props.toggleModal}>X</button>
            </div>
        </div>
    )
}
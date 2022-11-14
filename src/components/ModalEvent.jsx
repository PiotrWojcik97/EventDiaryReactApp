import React from "react";
import { allowedColors, smallImagesArray } from "../utils/utils";
import "../styles/Modal.css";
import ColorBox from "./ColorBox";
import UserBubble from "./UserBubble";
import globals from "../utils/globals";
import api from "../api/api";
import dayjs from "dayjs";
/**
 * Modal class representing Create Event Popup
 * @param {toggleModal} props 
 * @returns Modal
 */

// TODO: should be better name e.g. ModalEventAdding
// TODO: create one parent Modal and ModalContent instead of 3 modalsX
export default function ModalEvent(props) {
    const [formData, setFormData] = React.useState({
        startDate: null,
        endDate: null,
        eventType: 0,
        shortDescription: "",
        longDescription: "",
        userID: 0,
        imageURL: "",
        name: ""
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
                const data = {
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
                globals.events.push(data)
                api.createEvent(data)
            }
            else {
                console.log("divide algorithm")
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
                        let month_end = dayjs(new Date(start_year, start_month + 1, 0, 23, 59, 59)).format('YYYY-MM-DDTHH:mm:ss')
                        const data = {
                            user_id: formData.userID + 3,
                            name: formData.name,
                            start_time: formData.startDate,
                            end_time: month_end,
                            short_description: formData.shortDescription,
                            long_description: formData.longDescription,
                            image: "img url",
                            image_description: "img url",
                            type_id: formData.eventType + 1
                        }
                        // api push
                    }
                    else if (curr.year() == end_year && curr.month() == end_month)
                    {
                        let month_start = dayjs(new Date(start_year, start_month, 1, 0, 0, 1)).format('YYYY-MM-DDTHH:mm:ss')
                        const data = {
                            user_id: formData.userID + 3,
                            name: formData.name,
                            start_time: month_start,
                            end_time: formData.endDate,
                            short_description: formData.shortDescription,
                            long_description: formData.longDescription,
                            image: "img url",
                            image_description: "img url",
                            type_id: formData.eventType + 1
                        }
                        // api push
                        break;
                    }
                    else {
                        let month_end = dayjs(new Date(start_year, start_month + 1, 0, 23, 59, 59)).format('YYYY-MM-DDTHH:mm:ss')
                        let month_start = dayjs(new Date(start_year, start_month, 1, 0, 0, 1)).format('YYYY-MM-DDTHH:mm:ss')
                        const data = {
                            user_id: formData.userID + 3,
                            name: formData.name,
                            start_time: month_start,
                            end_time: month_end,
                            short_description: formData.shortDescription,
                            long_description: formData.longDescription,
                            image: "img url",
                            image_description: "img url",
                            type_id: formData.eventType + 1
                        }
                        // api push
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
                <form onSubmit={handleSubmit}>
                    <h2>Create Event</h2>

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
                    <button className="form-button">Submit</button>
                </form>
                <button className="close-modal" onClick={props.toggleModal}>X</button>
            </div>  
        </div>
    )
}
import React from "react";
import "../styles/Modal.css";
import ColorBox from "./ColorBox";
import UserBubble from "./UserBubble";
import { allowedColors, smallImagesArray, checkMonthIndex } from "../utils/utils";
import globals from "../utils/globals";
import api from "../api/api";
import dayjs from "dayjs";


/**
 * Modal class representing Event content, updating event, updating event_type
 */
export default function ModalEventContent(props) {
    const [modalData, setModelData] = React.useState(getModalContent(props.eventID))
    const [isUpdateClicked, setIsUpdateClicked] = React.useState(false)
    const [formData, setFormData] = React.useState({
        startDate: modalData.start_time,
        endDate: modalData.end_time,
        eventType: modalData.type_id,
        shortDescription: modalData.short_description,
        longDescription: modalData.long_description,
        userID: modalData.user_id - 3, // TODO: hardcoded
        imageURL: modalData.img,
        name: modalData.name
    })
    const [errorMessage, setErrorMessage] = React.useState("")
    const [typesFormData, setTypesFormData] = React.useState(globals.event_types)
    const [isEditColorsModalActive, setIsEditColorsModalActive] = React.useState(false)

    const colorBoxes = typesFormData.map(( item, idx) => {
        return <ColorBox
            key={idx}
            color={item.color}
            _id={item.id}
            handleClick={ isEditColorsModalActive ? doNotHandleColorBoxClick : handleColorBoxClick}
            isClicked={ isEditColorsModalActive ? false : item.id == formData.eventType ? true : false}
            />
    })

    const editColorBoxes = typesFormData.map((item, idx) => {
        return <div key={idx} className="editBoxes-div">
                <input
                    type="text"
                    placeholder={item.name}
                    className="form-input-edit"
                    onChange={handleTypeFormChange}
                    name={idx}
                    value={typesFormData[idx].name}
                />
                <button type="button" name={idx} onClick={removeEventType} className="remove-button">-</button>
            </div>
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

    function removeEventType(event) {
        const newArr = structuredClone(typesFormData)
        const {name, value} = event.target //rename name to index or sth
        newArr.splice(name, 1)
        setTypesFormData(newArr)
    }

    function newEventType() {
        const NUM_OF_ALLOWED_TYPES = 7
        if(typesFormData.length < NUM_OF_ALLOWED_TYPES) {
            const newArr = structuredClone(typesFormData)
            newArr.push({ 
                id: getNewID(),
                name: "New Type",
                color: getNewTypeColor()})
            setTypesFormData(newArr)
        }
        else {
            setErrorMessage(`You cannot have more than ${NUM_OF_ALLOWED_TYPES} types`)
        }
    }

    function getNewTypeColor() {
        for(let i=0; i<allowedColors.length; i++){
            let isNotFound = true
            for(let j=0; j<typesFormData.length; j++) {
                if(allowedColors[i] == typesFormData[j].color) {
                    isNotFound = false
                    break
                }
            }
            if(isNotFound)
                return allowedColors[i]
        }
    }

    function getNewID() {
        let newID = -1
        return newID
    }

    function handleTypeFormChange(event) {
        const newArr = structuredClone(typesFormData)
        const {name, value} = event.target
        newArr[name] = {    //rename name to index
            name: value,
            color: newArr[name].color,
            id: newArr[name].id
        }
        setTypesFormData(newArr)
    }

    function doNotHandleColorBoxClick(colorBoxID) {}

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
        if(isEditColorsModalActive) {
            
            // check length
            for(let i=0; i < typesFormData.length; i++) {
                if(typesFormData[i].name.length < 3)
                {
                    setErrorMessage("Type must have at least 3 characters")
                    return false
                }
                if(typesFormData[i].name.length > 25)
                {
                    setErrorMessage("Type must be shorter than 25 characters")
                    return false
                }
            }
        }
        else
        {
            if(formData.eventType == 0)
            {
                setErrorMessage("You need to choose event type")
                return false
            }

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
            if(formData.name.length > 25) {
                setErrorMessage("Event name cannot be longer than 25 characters")
                return false
            }
            if(formData.name.length < 3) {
                setErrorMessage("Event name cannot be shorter than 3 characters")
                return false
            }
            if(formData.shortDescription.length > 100) {
                setErrorMessage("Short description cannot be longer than 100 characters")
                return false
            }
            if(formData.longDescription.length > 1000) {
                setErrorMessage("Long description cannot be longer than 1000 characters")
                return false
            }
        }
        setErrorMessage("")
        return true
    }

    function handleColorsSubmit(event) {
        event.preventDefault()
        if(_validateForm()) {
            resolveChanges()
            props.toggleModal()
        }
    }

    function resolveChanges() {
        for( let i=0; i < globals.event_types.length; i++) {
            let isGlobalFound = false
            for( let j=0; j < typesFormData.length; j++) {
                if(typesFormData[j].id == globals.event_types[i].id){
                    isGlobalFound = true
                    if( typesFormData[j].color != globals.event_types[i].color ||
                        typesFormData[j].name != globals.event_types[i].name ) {
                            
                            api.updateType({
                                id: typesFormData[j].id,
                                name: typesFormData[j].name,
                                color: typesFormData[j].color
                            })
                        }
                }
                if(typesFormData[j].id < 0) {
                    api.createType({
                        name: typesFormData[j].name,
                        color: typesFormData[j].color
                    })

                    typesFormData[j].id = 0
                }
            }
            if(!isGlobalFound) {
                deleteEventsByTypeIdGlobals(globals.event_types[i].id)
                api.deleteEventByTypeId(globals.event_types[i].id)
                api.deleteType(globals.event_types[i].id)
            }
        }
        props.notifyEventUpdate()
    }

    function deleteEventsByTypeIdGlobals(type_id) {
        for(let i=0;i<globals.events.length;i++) {
            if(globals.events[i].type_id == type_id) {
                globals.events.splice(i, 1)
                i--
            }
        }
    }

    function _areStartDateAndEndDateInTheSameMonth() {
        const startMonth = new Date(formData.startDate).getMonth()
        const endMonth = new Date(formData.endDate).getMonth()
        if(startMonth == endMonth)
            return true
        return false
    }

    function getTypeName() {
        for(let i=0; i<globals.event_types.length; i++) {
            if(globals.event_types[i].id == formData.eventType){
                console.log(globals.event_types[i].name)
                return globals.event_types[i].name
            }
        }
        return ""
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
                type_id: formData.eventType
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
            <div className="modal-content" id={ isEditColorsModalActive || isUpdateClicked ? "modal-edit" : ""}>
                {
                isUpdateClicked
                ?
                // Update Start
                <form onSubmit={handleSubmit}>
                    <h2 className="title-h2">Update Event</h2>
                    <input
                        type="text"
                        placeholder="Event name"
                        className="form-input"
                        onChange={handleFormChange}
                        name="name"
                        value={formData.name}
                    />
                    <span className="span-form">Start time</span>
                    <input
                        type="datetime-local"
                        className="form-input"
                        onChange={handleFormChange}
                        name="startDate"
                        defaultValue={formData.startDate}
                    />
                    <span className="span-form">End time</span>
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
                    <button 
                        type='button' 
                        onClick={ () => {
                            setIsEditColorsModalActive(true)
                            setIsUpdateClicked(false)
                        }}
                        className="color-edit-button">Edit Types</button>
                    <span id="user-span">Choose user</span>
                    <div className="div-boxesContainer">
                        {userBubbles}
                    </div>
                    <h4 className="warning-h4">{errorMessage}</h4>
                    <button className="form-button">Update</button>
                </form>
                :
                isEditColorsModalActive
                ?
                    <form onSubmit={handleColorsSubmit}>
                        <span>
                            <h2>Warning</h2>
                            Deleting type with assigned events will cause all related events deletion
                        </span>
                        <div className="main-changeColor-div">
                            <div className="colorBox-holder color-boxes-margin">
                                {colorBoxes}
                            <button type='button' onClick={() => {newEventType()}} className="add-button">+</button>
                            </div>
                            <div className="colorBox-holder">
                                {editColorBoxes}
                            </div>
                        </div>
                        <div className="editColorbottomButtons-div">
                            <h4 className="warning-h4">{errorMessage}</h4>
                            <button>Save</button>
                            <button type='button'
                                onClick={() => {
                                    setErrorMessage("")
                                    setIsEditColorsModalActive(false)
                                    setIsUpdateClicked(true)
                                    setTypesFormData(globals.event_types)
                                }}
                                className="cancel-button">Cancel</button>
                        </div>
                    </form>
                :
                // Event visualization 
                <>
                    <div className="picture-description-holder">
                        <img className="modal-picture" src={smallImagesArray[modalData.user_id - 3]}/>
                        <div>
                            <h3 className="margin-5px">{modalData.name}</h3>
                            <span className="font-hang">{getTypeName()}</span><br />
                            <span className="time-font-size">
                                Start: {modalData.start_time}<br />
                                End:&nbsp;&nbsp; {modalData.end_time}<br />
                            </span>
                        </div>
                    </div>
                    <span>{modalData.short_description}</span><br /><br />
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
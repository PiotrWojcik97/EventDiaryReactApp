import React from 'react'
import './styles/App.css'
import Navbar from './components/Navbar'
import MainContent from './components/MainContent'
import Modal from './components/Modal'
import { getMonth, calculateEventTable } from "./utils/utils"
import globals from './utils/globals'
import exampleData from './utils/data'
import ModalEvent from './components/ModalEvent'
import ModalEventContent from './components/ModalEventContent'
import api from './api/api'

export default function App() {
    const [modal, setModal] = React.useState(false);
    const [modalEvent, setModalEvent] = React.useState(false);
    const [modalEventContent, setModalEventContent] = React.useState(false);
    const [currentMonth, setCurrentMonth] = React.useState(getMonth(globals.currentMonthIndex - 1))
    const [eventArray, setEventArray] = React.useState(calculateEventTable(exampleData))
    const [isAboutActive, setAboutActive] = React.useState(false)
    const [users, setUsers] = React.useState([])
    const [events, setEvents] = React.useState([])
    const [types, setTypes] = React.useState([])
    
    React.useEffect( () => {
        async function getData() {
            const res = await api.getUsers()
            setUsers(res)
        }
        getData()
    }, [])

    React.useEffect( () => {
        async function getData() {
            const res = await api.getEvents()
            setEvents(res)
        }
        getData()
    }, [])

    React.useEffect( () => {
        async function getData() {
            const res = await api.getTypes()
            setTypes(res)
        }
        getData()
    }, [])

    function notifyEventUpdate() {
        setEventArray(calculateEventTable(exampleData))
    }
    function changeMonth(event) {
        const {name} = event.target
        if(name === "decrement")
            globals.currentMonthIndex--
        else
            globals.currentMonthIndex++

        setCurrentMonth(getMonth(globals.currentMonthIndex - 1))
    }

    function toggleModal() {
        setModal(prevModal => !prevModal)
    }

    function toggleEventModal() {
        setModalEvent(prevEventModal => !prevEventModal)
    }

    function toggleModalEventContent() {
        setModalEventContent(prevModalEventContent => !prevModalEventContent)
    }

    // prevent page scrolling while any of the modal is active
    modal || modalEvent ? document.body.classList.add('active-modal') : document.body.classList.remove('active-modal')

    return (
            <div className="App">
                <Navbar toggleModal={toggleModal} setAboutActive={setAboutActive}/>
                <MainContent
                    currentMonth={currentMonth}
                    changeMonth={changeMonth}
                    eventArray={eventArray} 
                    toggleEventModal={toggleEventModal}
                    toggleModalEventContent={toggleModalEventContent}
                    isAboutActive={isAboutActive}
                    />
                {modal && <Modal toggleModal={toggleModal} />}
                {modalEvent && <ModalEvent toggleModal={toggleEventModal} notifyEventUpdate={notifyEventUpdate} />}
                {modalEventContent && <ModalEventContent toggleModal={toggleModalEventContent} eventID={globals.currentEventClicked} notifyEventUpdate={notifyEventUpdate} />}
            </div>
    )
}

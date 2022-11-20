import React from 'react'
import './styles/App.css'
import Navbar from './components/Navbar'
import MainContent from './components/MainContent'
import Modal from './components/Modal'
import { getMonth, calculateEventTable, getYear, checkMonthIndex } from "./utils/utils"
import globals from './utils/globals'
import ModalEvent from './components/ModalEvent'
import ModalEventContent from './components/ModalEventContent'
import ModalSort from './components/ModalSort'
import api from './api/api'
import { isJWTValid } from './utils/localStorage'

export default function App() {
    const [modal, setModal] = React.useState(false);
    const [modalEvent, setModalEvent] = React.useState(false);
    const [modalEventContent, setModalEventContent] = React.useState(false);
    const [modalSort, setModalSort] = React.useState(false);
    const [currentMonth, setCurrentMonth] = React.useState(getMonth(globals.currentMonthIndex - 1))
    const [eventArray, setEventArray] = React.useState(calculateEventTable(globals.events))
    const [isAboutActive, setAboutActive] = React.useState(false)
    const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(isJWTValid())
    const [users, setUsers] = React.useState([])
    const [events, setEvents] = React.useState([])
    const [types, setTypes] = React.useState([])
    const [updateCounter, setUpdateCounter] = React.useState(0)
    const [updateTrigger, setUpdateTrigger] = React.useState(0)

    // init year in globals
    if(globals.currentYear == 0)
        globals.currentYear = getYear()

    React.useEffect( () => {
        async function getData() {
            const res = await api.getUsers()
            setUsers(res)
        }
        getData()
    }, [])

    React.useEffect( () => {
        async function getData() {
            await new Promise(r => setTimeout(r, 300)) // ms timeout workaround for traffic time in network
            const data = {
                month: checkMonthIndex(globals.currentMonthIndex),
                year: globals.currentYear
            }
            const res = await api.getEvents(data)
            notifyEventUpdate()
        }
        getData()
    }, [currentMonth, updateTrigger])

    React.useEffect( () => {
        async function getData() {
            await new Promise(r => setTimeout(r, 300)) // ms timeout workaround for traffic time in network
            const res = await api.getTypes()
            globals.filters = res.map( item => {
                return {
                    type_id: item.id,
                    isNotFiltered: true
                }
            })
        }
        getData()
    }, [])

    React.useEffect( () => {
        async function getData() {
            await new Promise(r => setTimeout(r, 300)) // ms timeout workaround for traffic time in network
            const res = await api.getTypes()
            try {
                resolveFilters(res)
                setTypes(res)
            }
            catch {
                // sporadic exception that res is promise not fulfilled
            }
        }
        getData()

    }, [currentMonth, updateTrigger])


    function resolveFilters(event_types) {

        if(globals.filters == undefined) {
            globals.filters = res.map( item => {
                return {
                    type_id: item.id,
                    isNotFiltered: true
                }
            })
        }

        // check for adding filters in case new event_type was added
        for(let i=0; i < event_types.length; i++) {
            let isFilterFound = false
            for(let j=0; j < globals.filters.length; j++) {
                if(event_types[i].id == globals.filters[j].type_id ) {
                    isFilterFound = true
                }
            }
            if(!isFilterFound) {
                globals.filters.push({
                    type_id: event_types[i].id,
                    isNotFiltered: true
                })
            }
        }

        // check for deleting filters in case some event_type was deleted 
        for(let i=0; i < globals.filters.length; i++) {
            let isEventTypeFound = false
            for(let j=0; j < event_types.length; j++) {
                if(event_types[j].id == globals.filters[i].type_id ) {
                    isEventTypeFound = true
                }
            }                                                                                                                                 
            if(!isEventTypeFound) {
                globals.filters.splice(i, 1)
            }
        }
    }

    function notifyEventUpdate() {
        const ev_arr = calculateEventTable(globals.events)
        setEventArray(ev_arr)
        if(updateCounter % 2 == 0) {
            setUpdateTrigger(prevUpdateTrigger => prevUpdateTrigger + 1 )
        }
        setUpdateCounter( prevUpdateCounter => prevUpdateCounter + 1 )
    }
    
    function changeMonth(event) {
        const {name} = event.target
        if(name === "decrement")
            globals.currentMonthIndex--
        else
            globals.currentMonthIndex++

        globals.currentYear = getYear(globals.currentMonthIndex - 1)
        globals.events = []
        const ev_arr = calculateEventTable(globals.events)
        setEventArray(ev_arr)
        setCurrentMonth(getMonth(globals.currentMonthIndex - 1))
    }

    function toggleModal() {
        setModal(prevModal => !prevModal)
    }

    function toggleEventModal() {
        setModalEvent(prevEventModal => !prevEventModal)
    }

    function toggleSortModal() {
        setModalSort(prevSortModal => !prevSortModal)
    }

    function toggleModalEventContent() {
        setModalEventContent(prevModalEventContent => !prevModalEventContent)
    }

    // prevent page scrolling while any of the modal is active
    modal || modalEvent ? document.body.classList.add('active-modal') : document.body.classList.remove('active-modal')

    return (
            <div className="App">
                <Navbar toggleModal={toggleModal} setAboutActive={setAboutActive} isUserLoggedIn={isUserLoggedIn}/>
                <MainContent
                    currentMonth={currentMonth}
                    changeMonth={changeMonth}
                    eventArray={eventArray} 
                    toggleEventModal={toggleEventModal}
                    toggleModalEventContent={toggleModalEventContent}
                    toggleModalSort={toggleSortModal}
                    isAboutActive={isAboutActive}
                    isUserLoggedIn={isUserLoggedIn}
                    />
                {modal && <Modal toggleModal={toggleModal} setIsUserLoggedIn={setIsUserLoggedIn} isUserLoggedIn={isUserLoggedIn}/>}
                {modalEvent && <ModalEvent toggleModal={toggleEventModal} notifyEventUpdate={notifyEventUpdate} />}
                {modalSort && <ModalSort toggleModal={toggleSortModal} notifyEventUpdate={notifyEventUpdate}/> }
                {modalEventContent && <ModalEventContent 
                    toggleModal={toggleModalEventContent}
                    eventID={globals.currentEventClicked}
                    isUserLoggedIn={isUserLoggedIn}
                    notifyEventUpdate={notifyEventUpdate} />}
            </div>
    )
}

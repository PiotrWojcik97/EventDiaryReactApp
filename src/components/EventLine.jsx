import React from 'react'
import Event from './Event';
import "../styles/Event.css";


/**
 * One Event Line per user, which are holding events
 */
export default function EventLine(props) {
  function isEventPresent() {
    if(props.eventArray && props.eventArray.length > 0)
      return true
    return false
  }
  
  let events = (<></>)
  if(isEventPresent())
  {
    events = props.eventArray.map( (eventItem, idx) => {
      return (
        <Event
          key={idx}
          eventID={eventItem.eventID}
          startPos={eventItem.startTime}
          endPos={eventItem.endTime}
          type_id={eventItem.type_id}
          toggleModalEventContent = {props.toggleModalEventContent}
        />
      )
    })
  }

  return (
    <div className='event-container'>
      {events}
    </div>
  )
}

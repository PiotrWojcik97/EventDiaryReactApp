import React from 'react'
import EventLine from './EventLine';
import "../styles/Day.css";

export default function Day(props) {
    const NUMBER_OF_USERS = 3
    
    function getEventArray(userNum) {
        if(props.userEventArray)
            return props.userEventArray[userNum]
    }

    const eventLines = new Array(NUMBER_OF_USERS).fill().map(
        (_, idx) => <EventLine
                        key={idx}
                        eventArray={getEventArray(idx)} 
                        maxWidth={100} 
                        toggleModalEventContent={props.toggleModalEventContent}
                    />
    )

    return (
        <div className='tile-div'>
            <span>{props.day.format('DD')}</span>
            <div>
                {eventLines}
            </div>
        </div>
    )
}
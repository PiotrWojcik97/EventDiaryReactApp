import React from 'react'
import EventLine from './EventLine';
import "../styles/Day.css";
import globals from '../utils/globals';
import { checkMonthIndex } from '../utils/utils';


/**
 * Instance of a Day in calendar. Holding EventLines inside that are holding events.
 */
export default function Day(props) {
    const NUMBER_OF_USERS = 3
    
    function getEventArray(userNum) {
        if(props.userEventArray) {
            return props.userEventArray[userNum]
        }
    }
    
    function isNotSorted() {
        const currentDayNumber = Number(props.day.format('DD'))
        if( currentDayNumber < globals.sort.start || currentDayNumber > globals.sort.end)
            return false
        return true
    }

    const eventLines = new Array(NUMBER_OF_USERS).fill().map(
        (_, idx) => <EventLine
                        key={idx}
                        eventArray={getEventArray(idx)} 
                        maxWidth={100} 
                        toggleModalEventContent={props.toggleModalEventContent}
                    />
    )
    console.log()
    return (
        <div className='tile-div'>
            <span>
            {
                props.day.format("MM") == checkMonthIndex(globals.currentMonthIndex)
                ?
                props.day.format('DD')
                :
                <></>
            }</span>
            <div>
                { isNotSorted() && eventLines }
            </div>
        </div>
    )
}
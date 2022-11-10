import React from 'react'
import "../styles/Event.css";
import { allowedColors } from '../utils/utils';
import globals from '../utils/globals';

export default function Event(props) {

    function isDurationEventSmall() {
        if(props.endPos - props.startPos < 0.05)
            return true
        return false
    }

    function calculateEventWidth() {
        let width = 0
        if(isDurationEventSmall()) {
            width = 8
        }
        else {
            width = 100*(props.endPos-props.startPos)
        }
        return width
    }

    function EventClicked() {
        globals.currentEventClicked = props.eventID
        props.toggleModalEventContent()
    }

    return (
        <div
            className='event-div'
            style={{"width": `${calculateEventWidth()}%`,
                    "marginLeft": `${100*(props.startPos)}%`,
                    "backgroundColor": `${allowedColors[props.colorID]}`
                }}
            onClick={EventClicked}
        />
    )
}

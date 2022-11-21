import React from 'react'
import "../styles/Modal.css";


/**
 * ColorBox holds representation of event-type color. Used while choosing on update/create event
 */
export default function ColorBox(props) {
    
    return (
        <>
            <div
                className='colorBox'
                style={{
                    backgroundColor: `${props.color}`,
                    border: `${ props.isClicked ? "2px blue solid" : "2px lightgrey solid" }`
                }}
                onClick={() => props.handleClick(props._id)}
            />
            { props._id == 9 ? <div className='break'></div>: <></>}
        </>
    )
}

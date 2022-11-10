import React from 'react'
import "../styles/Modal.css";

export default function ColorBox(props) {
    
    return (
        <div
            className='colorBox'
            style={{
                backgroundColor: `${props.color}`,
                border: `${ props.isClicked ? "2px blue solid" : "2px lightgrey solid" }`
            }}
            onClick={() => props.handleClick(props._id)}
        />
    )
}

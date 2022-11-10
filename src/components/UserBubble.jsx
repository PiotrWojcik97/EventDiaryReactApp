import React from 'react'

export default function UserBubble(props) {
    return (
        <img
            src={props.img}
            className='userBubble'
            style={{
                border: `${ props.isClicked ? "2px blue solid" : "2px lightgrey solid" }`
            }}
            onClick={() => props.handleClick(props._id)}
        />
    )
}

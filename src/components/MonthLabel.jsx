import React from 'react'
import "../styles/MonthLabel.css";


/**
 * Holds Label of current month
 */
export default function MonthLabel(props) {
  return (
    <>
      <div id='tile-div' className='tile-div'>{props.dayName}</div>
    </>
  )
}

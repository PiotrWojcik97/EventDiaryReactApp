import React from "react";
import Day from "./Day";
import MonthLabel from "./MonthLabel";
import parse from 'html-react-parser'
import "../styles/Month.css";
import "../styles/Print.css";
import globals from "../utils/globals";
import { checkMonthIndex } from "../utils/utils";

/**
 * What should be done better in project: (it has not been done so far due to lack of time)
 *  - refactor from Month to Calendar name (Calendar name is better)
 *  - generate users dynamically and adjust content to them instead of statically (those face bubble on the left)
 *  - divide content for more readable components instead of so many items put inside one component
 *  - resolve weird scaling on a smaller screen (appearing bar on the bottom)
 *  - 4 lines indent everywhere instead of 2 in some files
 *  - tests
 *  - better documentation
 */
export default function Month(props) {
  const lt = "<"
  const gt = ">"

  // determine if events are related to current month
  function currentMonthDay(day) {
    if(day.format("MM") == checkMonthIndex(globals.currentMonthIndex))
    {
      return props.eventArray[day.format("D")]
    }
    return null

  }

  return (
    <div>
      <div className='month-name'>
        {props.isUserLoggedIn ? <button id="calendar-button-create" className="printInvisible" onClick={props.toggleEventModal}>Create Event</button> : <div id="calendar-button-create"></div>}
        <button id="calendar-button-left" className="printInvisible" name="decrement" onClick={props.changeMonth}>{parse(lt)}</button>
        <h3>{props.month[2][1].format("MMMM YYYY")}</h3>
        <button id="calendar-button-right" className="printInvisible" name="increment" onClick={props.changeMonth}>{parse(gt)}</button>
      </div>
      <div className="month-div month-padding">
        {props.month[0].map((day, i) => {
            return <MonthLabel key={i} dayName={day.format("ddd").toUpperCase()} />;
        })}
      </div>
      <div className="calendar-box">
        {/* TODO: month sidebar should be generated instead of statically written- future job to do */}
        <div className="month-sidebar">
          <img className="calendar-faceimg calendar-firstimg" src="dog_square_small.jpg"/>
          <img className="calendar-faceimg" src="face_baby_square_small.jpg"/>
          <img className="calendar-faceimg" src="face_girl_square_small.jpg"/>

          <img className="calendar-faceimg calendar-firstimg" src="dog_square_small.jpg"/>
          <img className="calendar-faceimg" src="face_baby_square_small.jpg"/>
          <img className="calendar-faceimg" src="face_girl_square_small.jpg"/>

          <img className="calendar-faceimg calendar-firstimg" src="dog_square_small.jpg"/>
          <img className="calendar-faceimg" src="face_baby_square_small.jpg"/>
          <img className="calendar-faceimg" src="face_girl_square_small.jpg"/>

          <img className="calendar-faceimg calendar-firstimg" src="dog_square_small.jpg"/>
          <img className="calendar-faceimg" src="face_baby_square_small.jpg"/>
          <img className="calendar-faceimg" src="face_girl_square_small.jpg"/>

          <img className="calendar-faceimg calendar-firstimg" src="dog_square_small.jpg"/>
          <img className="calendar-faceimg" src="face_baby_square_small.jpg"/>
          <img className="calendar-faceimg" src="face_girl_square_small.jpg"/>

          <img className="calendar-faceimg calendar-firstimg" src="dog_square_small.jpg"/>
          <img className="calendar-faceimg" src="face_baby_square_small.jpg"/>
          <img className="calendar-faceimg" src="face_girl_square_small.jpg"/>
        </div>
        <div className="month-div">
          {props.month.map((row, i) => {
            return row.map((day, j) => {
              return <Day
                day={day}
                key={i * row.length + j}
                userEventArray={currentMonthDay(day)}
                toggleModalEventContent={props.toggleModalEventContent}
              />;
            });
          })}
        </div>
      </div>
    </div>
  );
}

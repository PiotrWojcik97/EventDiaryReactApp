import React from "react"
import Month from "./Month"

export default function MainContent(props) {

    return (
        <main>
            {
                props.isAboutActive
                ?
                    <div className="about-div">
                    <h2 className="title">About App</h2>
                    <span>
                        You can use this application to visualize events and processes.
                        (within process occur time differs from finishing time, whereas in event it remains the same)
                    </span>
                    <h2 className="title">App Usage</h2>
                    <span>
                        To be able to create and delete events You need to login first. Below are credentials:
                        <div className="about-table">
                            <div>
                                <div>login</div>
                                <div>password</div>
                            </div>
                            <div>
                                <div>admin</div>
                                <div>admin</div>
                            </div>
                        </div>
                    </span>
                    <h2 className="title">Used Tools</h2>
                    <span>
                        Application is divided to front and back end. Front is written in React, backend is written in PHP.<br />
                        Communication between front and back end is done by REST API.<br />
                        Data such as events and accounts are stored in MySQL database.
                    </span>
                    </div>
                :
                    <Month 
                        month={props.currentMonth} 
                        toggleEventModal={props.toggleEventModal}
                        changeMonth={props.changeMonth}
                        eventArray={props.eventArray}
                        toggleModalEventContent={props.toggleModalEventContent}
                    />
            }
        </main>
    )
}
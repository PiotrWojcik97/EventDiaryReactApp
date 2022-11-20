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
                        Data such as events and accounts are stored in MySQL database.<br />
                        React App, PHP and MySQL are deployed to Azure cloud.<br />
                        Project repositories can be found on github:<br />
                        -
                    </span>
                    <a href="https://github.com/PiotrWojcik97/EventDiaryReactApp">React</a><br />
                    <span>-</span>
                    <a href="https://github.com/PiotrWojcik97/EventDiaryPHPBackend">PHP</a><br />
                    <h2 className="title">Project Requirements</h2>
                    <h4 className="title">Technical Requirements</h4>
                    <span>
                        ✔️ PHP 8.1 <br />
                        ✔️ React JS (Node 18.x)<br />
                        ✔️ My SQL/MariaDB<br />
                        ✔️ HTML 5<br />
                        ✔️ CSS 3<br />
                    </span>
                    <h4 className="title">Project specific</h4>
                    <span>
                        ✔️ REST API<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;✔️ GET, POST, DELETE, PUT Methods<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;✔️ 200, 400, 401 Statues<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;✔️ API Authentication with JWT<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;❌ No pure REST API Style (PHP Rest API style: url endings present with .php Solution: adding nginx with configuration)<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;❌ No image transfer between front and back end<br />
                        ✔️ PHP<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;✔️ MySQL database connection<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;✔️ SQL Injection protected (PDO Statements)<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;✔️ API Swagger documentation<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;✔️ Password Hashing (Methods: password_hash, password_verify) <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;✔️ Scripts to create database with example data<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;✔️ Able to retrieve stored image in database<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;✔️ Git versioning<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;✔️ Deploying app to Azure by github pipeline on a commit<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;✔️ JWT authentication implementation (lasting for one day)<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;❌ REST API data validation (Done in front end, however should be done also in backend)<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;❌ Project configuration .yaml file (e.g. containing database address)<br />
                        ✔️ SQL<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;✔️ Relational database<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;✔️ Storing also images<br />
                        ✔️ React<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;✔️ Processes and events visualization (events have the same start_time nad end_time)<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;✔️ Events CRUD operations<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;✔️ Event_types CRUD operations<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;✔️ Event_types visualization by colors<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;✔️ Multi month/year handling<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;✔️ Event_types Filters<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;✔️ Logging system<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;✔️ Data validation<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;✔️ Hiding controllers while printing<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;✔️ Good app width and height scaling (except modals)<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;✔️ Monthly visualization<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;✔️ Local storage for JWT<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;✔️ JWT validation at app open<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;✔️ Git versioning<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;✔️ Deploying app to Azure by github pipeline on a commit<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;❌ JWT expiration date hardcoded in frontend<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;❌ Project configuration .yaml file (e.g. containing back end address)<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;❌ No positive confirmation after successful action (e.g. after event creation)<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;❌ No dynamic Users (Users are hardcoded)<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;❌ Huge project refractor needed (doubled functions, renaming components for better readability, getting rid of globals etc. )<br />
                    </span>
                    <h4 className="title">Known issues</h4>
                    <span>
                        React: no checking if JWT expired during application working <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;Solution: implement checking HTTP 401 status, if present, popup waring and user login modal. <br /><br />
                        React and PHP: Multi-month processes during update have wrong default time values. <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;Solution: implement another field in REST API called: default_start_time, default_end_time. Do back end logic to retrieve that information, send it to front end. In front end implement use case in event update modal.
                    </span>
                    </div>
                :
                    <Month 
                        month={props.currentMonth} 
                        toggleEventModal={props.toggleEventModal}
                        changeMonth={props.changeMonth}
                        eventArray={props.eventArray}
                        toggleModalEventContent={props.toggleModalEventContent}
                        isUserLoggedIn={props.isUserLoggedIn}
                        toggleModalSort={props.toggleModalSort}
                    />
            }
        </main>
    )
}
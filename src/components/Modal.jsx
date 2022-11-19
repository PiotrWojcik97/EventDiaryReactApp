import React from "react";
import "../styles/Modal.css";
import api from "../api/api";

/**
 * Modal class representing LogIn Popup
 * @param {toggleModal} props 
 * @returns Modal
 */
export default function Modal(props) {
    const [formData, setFormData] = React.useState({
        username: "",
        password: "",
        newPassword: ""
    })
    const [warningText, setWarningText] = React.useState("")
    const [isChangePasswordClicked, setIsChangePasswordClicked] = React.useState(false)

    async function handleSubmit(event) {
        event.preventDefault()
        let res
        if(isChangePasswordClicked) {
            res = await api.changePassword(formData)
        }
        else {
            res = await api.login({
                username: formData.username,
                password: formData.password,
            })
        }
        if( res != "OK"){
            setWarningText("Wrong credentials")
        }
        else {
            if(isChangePasswordClicked) {
                setIsChangePasswordClicked(false)
                setWarningText("")
            }
            else {
                // change avatar
                props.setIsUserLoggedIn(true)
                props.toggleModal()
            }
        }
    }

    function handleFormChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    return (
        <div className="modal">
            <div className="overlay" onClick={props.toggleModal}></div>
            <div id="modal-login" className="modal-content">
                {isChangePasswordClicked
                ?
                <form onSubmit={handleSubmit}>
                    <h2>Change Password</h2>
                    <input
                        type="text"
                        placeholder="Login"
                        className="form-input"
                        onChange={handleFormChange}
                        name="username"
                        value={formData.username}
                    />
                    <input 
                        type="password" 
                        placeholder="Previous password"
                        className="form-input"
                        name="password"
                        onChange={handleFormChange}
                        value={formData.password}
                    />
                    <input 
                        type="password" 
                        placeholder="New password"
                        className="form-input"
                        id="form-password"
                        name="newPassword"
                        onChange={handleFormChange}
                        value={formData.newPassword}
                    />
                    <h4 className="warning-h4">{warningText}</h4>
                    <div className="button-div">
                        <button id="button-login" className="form-button">Change</button>
                        <button id="button-cancel" onClick={() => {
                            setIsChangePasswordClicked(false)
                            setWarningText("")
                        }} className="form-button">Cancel</button>
                    </div>
                </form>
                :
                    props.isUserLoggedIn
                    ?
                    <form>
                        <h2>Log out</h2>
                        <img className="modal-picture-user" src="dog_square_big.jpg"/>
                        <div className="div-margin">
                            <button id="button-login" className="form-button">Log out</button>
                            <button
                                id="change-password" 
                                onClick={() => {
                                    setIsChangePasswordClicked(true)
                                    setWarningText("")
                                    }} 
                                className="form-button">Change password</button>
                        </div>
                    </form>
                    :
                    <form onSubmit={handleSubmit}>
                        <h2>Sign in</h2>
                        <input
                            type="text"
                            placeholder="Login"
                            className="form-input"
                            onChange={handleFormChange}
                            name="username"
                            value={formData.username}
                        />
                        <input 
                            type="password" 
                            placeholder="Password"
                            className="form-input"
                            id="form-password"
                            name="password"
                            onChange={handleFormChange}
                            value={formData.password}
                        />
                        <h4 className="warning-h4">{warningText}</h4>
                        <div className="align-modals-div">
                            <button id="button-login" className="form-button">Log in</button>
                            <button 
                                id="change-password" 
                                onClick={() => {
                                    setIsChangePasswordClicked(true)
                                    setWarningText("")
                                    }} 
                                className="form-button">Change password</button>
                        </div>
                    </form>
                }
                <button className="close-modal" onClick={props.toggleModal}>X</button>
            </div>  
        </div>
    )
}
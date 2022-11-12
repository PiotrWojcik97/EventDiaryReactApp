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
        password: ""
    })
    const [warningText, setWarningText] = React.useState("")

    async function handleSubmit(event) {
        event.preventDefault()
        console.log(formData)
        let res = await api.login(formData)
        console.log(res)
        if( res != "OK"){
            setWarningText("Wrong credentials")
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
            <div className="modal-content">
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
                    <button id="button-login" className="form-button">Log in</button>
                </form>
                
                <button className="close-modal" onClick={props.toggleModal}>X</button>
            </div>  
        </div>
    )
}
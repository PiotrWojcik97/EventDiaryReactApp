import React from "react";
import "../styles/Modal.css";

/**
 * Modal class representing LogIn Popup
 * @param {toggleModal} props 
 * @returns Modal
 */
export default function Modal(props) {
    const [formData, setFormData] = React.useState({
        login: "",
        password: ""
    })

    function handleSubmit(event) {
        event.preventDefault()
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
                        name="login"
                        value={formData.login}
                    />
                    <input 
                        type="password" 
                        placeholder="Password"
                        className="form-input"
                        name="password"
                        onChange={handleFormChange}
                        value={formData.password}
                    />
                    <button className="form-button">Log in</button>
                </form>
                
                <button className="close-modal" onClick={props.toggleModal}>X</button>
            </div>  
        </div>
    )
}
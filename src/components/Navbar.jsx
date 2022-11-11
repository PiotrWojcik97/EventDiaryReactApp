import '../styles/Print.css'
import '../styles/Navbar.css'

export default function Navbar(props) {

    return (
        <nav>
            <img onClick={() => {props.setAboutActive(false)}} className='nav--img clickable-item' src='../../public/logo.png'/>
            <h2 onClick={() => {props.setAboutActive(false)}} className='nav--title clickable-item'>EventDiary</h2>
            <button onClick={() => {props.setAboutActive(true)}} className='nav--button printInvisible'>About</button>
            <button className='nav--button printInvisible' onClick={props.toggleModal}>Log in</button>
            <img className='nav--img printInvisible' src='../../public/login.png'/>
        </nav>
    )
}
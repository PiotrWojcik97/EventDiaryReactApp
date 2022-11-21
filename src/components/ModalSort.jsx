import React from "react";
import globals from "../utils/globals";
import ColorBox from "./ColorBox";
import "../styles/Modal.css";


/**
 * Modal class representing modal with filters
 */
export default function ModalSort(props) {

    const [ checkboxes, setCheckboxes] = React.useState(globals.filters.map(item => item.isNotFiltered))
    const [ formNumbers, setFormNumbers] = React.useState(globals.sort)
    const [errorMessage, setErrorMessage] = React.useState("")


    const colorBoxes = globals.event_types.map(( item, idx) => {
        return <ColorBox
            key={idx}
            color={item.color}
            _id={item.id}
            handleClick={ HandleColorClick }
            isClicked={ false }
            />
    })

    const formCheckBoxes = globals.event_types.map(( _, idx) => {
        return <input
            checked={checkboxes[idx]}
            className="checkbox"
            key={idx} 
            type="checkbox"
            onChange={handleChange}
            name={idx} />
    })

    const names = globals.event_types.map(( item, idx) => {
        return <div
            className="name-div"
            key={idx}>
            <span>{item.name}</span>
        </div>
    })

    function HandleColorClick(id) {
        const newCheckBoxesArray = structuredClone(checkboxes)
        for(let i=0; i<globals.filters.length; i++) {
            if(globals.filters[i].type_id == id) {
                newCheckBoxesArray[i] ? newCheckBoxesArray[i] = false : newCheckBoxesArray[i] = true
            }
        }
        setCheckboxes(newCheckBoxesArray)
    }

    function handleChange(event) {
        const {name, checked} = event.target
        const newCheckBoxesArray = structuredClone(checkboxes)
        newCheckBoxesArray[name] = checked
        setCheckboxes(newCheckBoxesArray)
    }

    function handleNumberChange(event) {
        const {name, value} = event.target
        setFormNumbers(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    function checkDaysNumberCorrection() {
        if(formNumbers.start <= formNumbers.end)
            return true
        return false
    }

    function handleSubmit(event) {
        event.preventDefault()
        if(checkDaysNumberCorrection()) {
            const filterArray = globals.event_types.map(( item, idx) => {
                return {
                    type_id: item.id,
                    isNotFiltered: checkboxes[idx]
                }
            })
    
            globals.filters = filterArray
            globals.sort = formNumbers
            
            setErrorMessage("")
            props.toggleModal()
            props.notifyEventUpdate()
        }
        else {
            setErrorMessage("Start day must be less or equal ending day")
        }
    }

    function clearFilter(event) {
        setCheckboxes(globals.event_types.map( item => true ))
    }


    return (
        <div className="modal">
            <div className="overlay" onClick={props.toggleModal}></div>
            <div id="sort-modal" className="modal-content">
                <h2 className="sort-title">Filters</h2>
                <div>
                    <form onSubmit={handleSubmit}>
                        {formCheckBoxes}
                        <button className="apply-button">Apply Filter</button>
                    </form>
                </div>
                <div>
                    {colorBoxes}
                </div>
                <div>
                    {names}
                </div>
                <div className="div-number-input">
                    <h4 className="h4-filter">Show days:</h4>
                    <div>
                        <span>From</span>
                        <input
                            className="input-number"
                            type="number" 
                            name="start"
                            min="1" 
                            max="31"
                            value={formNumbers.start}
                            onChange={handleNumberChange}
                        />
                        <span>To</span>
                        <input
                            className="input-number"
                            type="number" 
                            name="end"
                            min="1" 
                            max="31"
                            value={formNumbers.end}
                            onChange={handleNumberChange}
                        />
                    </div>
                    <h4 id="warning-h4-sort">{errorMessage}</h4>
                </div>
                <button type="button" className="close-modal" onClick={props.toggleModal}>X</button>
                <button type="button" className="clear-button" onClick={clearFilter}>Clear Filter</button>
            </div>  
        </div>
    )
}
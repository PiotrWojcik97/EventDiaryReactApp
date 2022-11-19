import React from "react";
import globals from "../utils/globals";
import ColorBox from "./ColorBox";
import "../styles/Modal.css";

export default function ModalSort(props) {

    const [ checkboxes, setCheckboxes] = React.useState(globals.filters.map(item => item.isNotFiltered))

    const colorBoxes = globals.event_types.map(( item, idx) => {
        return <ColorBox
            key={idx}
            color={item.color}
            _id={item.id}
            handleClick={ undefined }
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

    function handleChange(event) {
        const {name, checked} = event.target
        const newCheckBoxesArray = structuredClone(checkboxes)
        newCheckBoxesArray[name] = checked
        setCheckboxes(newCheckBoxesArray)
    }

    function handleSubmit(event) {
        event.preventDefault()
        const filterArray = globals.event_types.map(( item, idx) => {
            return {
                type_id: item.id,
                isNotFiltered: checkboxes[idx]
            }
        })

        globals.filters = filterArray
        props.toggleModal()
        props.notifyEventUpdate()
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
                <button type="button" className="close-modal" onClick={props.toggleModal}>X</button>
                <button type="button" className="clear-button" onClick={clearFilter}>Clear Filter</button>
            </div>  
        </div>
    )
}
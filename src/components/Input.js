import React from 'react'

export const Input = props => {
    switch(props.attr.type) {
        case 'text':
        return (
            <div className="form-group">
                <label htmlFor={props.id}>{props.attr.placeholder}</label>
                <input className="form-control" id={props.id} type="text" {...props.attr} defaultValue={props.value} />
            </div>
        )
        case 'select':
        return (
            <div className="form-group">
                <label htmlFor={props.id}>{props.attr.placeholder}</label>
                <select className="form-control" id={props.id} defaultValue="placeholder">
                    <option value="placeholder" disabled>{props.attr.placeholder}</option>
                    {props.value.map(option => <option key={option.value} value={option.value}>{option.display}</option> )}
                </select>
            </div>
        )
        default:
        return null
    }
}
import React from 'react'

export const Input = props => {
    const formClass = "form-control"
    switch(props.attr.type) {
        case 'text':
        return (
            <div className="form-group">
                <label htmlFor={props.id}>{props.attr.placeholder}</label>
                <input className={ props.valid.isValid ? "is-valid " + formClass : (props.valid.isValid === null ? formClass : "is-invalid " + formClass) } onChange={props.change} id={props.id} type="text" {...props.attr} defaultValue={props.value} />
                <div className="invalid-feedback">
                    {props.valid.messages.map( message => message )}
                </div>
            </div>
        )
        case 'select':
        return (
            <div className="form-group">
                <label htmlFor={props.id}>{props.attr.placeholder}</label>
                <select className="form-control" id={props.id} onChange={props.change} defaultValue="placeholder">
                    <option value="placeholder" disabled>{props.attr.placeholder}</option>
                    {props.options.map(option => <option key={option.value} value={option.value}>{option.display}</option> )}
                </select>
            </div>
        )
        default:
        return null
    }
}
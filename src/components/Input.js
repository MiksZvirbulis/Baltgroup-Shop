import React from 'react'

export const Input = props => {
    switch(props.type) {
        case 'text':
        return <input type="text" defaultValue={props.value} />
        case 'select':
        return (
            <select>
                {props.value.map(option => <option key={option.value} value={option.value}>{option.display}</option> )}
            </select>
        )
        default:
        return
    }
}
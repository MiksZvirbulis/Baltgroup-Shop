import React from 'react'

import { Input } from './Input'

class Donate extends React.Component {
    state = {
        formData: {
            username: {
                type: "text",
                value: "",
                valid: true,
                rules: {
                    minChars: 3,
                    maxChars: 25
                }
            },
            comment: {
                type: "text",
                value: "",
                valid: true,
                rules: {
                    minChars: 3,
                    maxChars: 75
                }
            },
            price: {
                type: "select",
                value: [
                    { value: 100, display: '1.00 EUR' },
                    { value: 150, display: '1.50 EUR' },
                    { value: 200, display: '2.00 EUR' }
                ],
                valid: true
            },
            code: {
                type: "text",
                value: "",
                valid: true
            }
        },
        formValid: false
    }

    render() {
        let formData = []
        for (let key in this.state.formData) {
            formData.push(this.state.formData[key])
        }
        return (
            <div>
                <h3>Donate</h3>
                {formData.map((input, index) => <Input key={index} {...input} /> )}
            </div>
        )
    }
}

export default Donate
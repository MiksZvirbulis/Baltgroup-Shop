import React from 'react'
import config from '../../config'

import Plugin from '../Plugin'

const Donate = () => {
    
    const formData = {
        comment: {
            attr: {
                type: "text",
                placeholder: "Tavs komentārs"
            },
            value: "",
            valid: { isValid: null, messages: [] },
            rules: {
                minChars: 10,
                maxChars: 150
            }
        },
        price: {
            attr: {
                type: "select",
                placeholder: "Ziedojuma cena",
                size: "3"
            },
            options: [
                { value: 1, display: '1.00 ' + config.CURRENCY },
                { value: 1.5, display: '1.50 ' + config.CURRENCY },
                { value: 2.0, display: '2.00 ' + config.CURRENCY }
            ],
            value: 0,
            valid: { isValid: null, messages: [] }
        }
    }

    return <Plugin
        successMessage="Paldies par ziedojumu!"
        pluginName="donate"
        displayName="Ziedošana"
        formData={formData}
    />
}

export default Donate
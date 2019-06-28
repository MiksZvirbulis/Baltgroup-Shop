import React from 'react'
import config from '../../config'

import Plugin from '../Plugin'

const MCUnban = props => {

    const formData = {
        unbanValue: {
            attr: {
                type: "text",
                placeholder: "Spēlētāja vārds vai IP adrese"
            },
            value: props.playerName,
            valid: { isValid: true, messages: [] },
            rules: {
                minChars: 3,
                maxChars: 16
            }
        },
        price: {
            attr: {
                type: "select",
                placeholder: "Unban veids",
                size: "3"
            },
            options: [
                { value: 1, display: `Vārda unban (1.00 ${config.CURRENCY})` },
                { value: 1.50, display: `IP unban (1.50 ${config.CURRENCY})` }
            ],
            value: 0,
            valid: { isValid: null, messages: [] }
        }
    }
    
    return <Plugin
        successMessage="Paldies par pirkumu!"
        pluginName="mc_unban"
        displayName="Spēlētāja & IP Unban"
        formData={formData}
    />
}

export default MCUnban
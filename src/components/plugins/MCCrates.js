import React from 'react'
import config from '../../config'

import Plugin from '../Plugin'

const MCCrates = () => {

    const formData = {
        price: {
            attr: {
                type: "select",
                placeholder: "Kastu atslēgas",
                size: "3"
            },
            options: [
                { value: 1, display: `Common (1.00 ${config.CURRENCY})` },
                { value: 1.50, display: `Epic (1.50 ${config.CURRENCY})` },
                { value: 2, display: `Legendary (2.00 ${config.CURRENCY})` }
            ],
            value: 0,
            valid: { isValid: null, messages: [] }
        }
    }
    
    return <Plugin
        successMessage="Paldies par pirkumu!"
        pluginName="mc_crates"
        displayName="Kastu Atslēgas"
        formData={formData}
    />
}

export default MCCrates
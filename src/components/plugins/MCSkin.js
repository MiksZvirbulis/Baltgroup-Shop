import React from 'react'
import config from '../../config'

import Plugin from '../Plugin'

const MCSkin = () => {
    
    const formData = {
        price: {
            attr: {
                type: "select",
                placeholder: "Spēlētāja skin",
                size: "3"
            },
            options: [
                { value: 1, display: `Lady (1.00 ${config.CURRENCY})` },
                { value: 1.50, display: `Prince (1.50 ${config.CURRENCY})` },
                { value: 2, display: `King (2.00 ${config.CURRENCY})` }
            ],
            value: 0,
            valid: { isValid: null, messages: [] }
        }
    }

    return <Plugin
        successMessage="Paldies par pirkumu!"
        pluginName="mc_skin"
        displayName="Spēlētāja Skin"
        formData={formData}
    />
}

export default MCSkin
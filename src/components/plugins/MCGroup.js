import React from 'react'
import config from '../../config'

import Plugin from '../Plugin'

const MCGroup = () => {

    const groupTypes = [
        {
            value: 1,
            price: 1.15,
            display: `Donator (12 dienas - 1.15 ${config.CURRENCY})`,
            length: 12
        },
        {
            value: 2,
            price: 2.20,
            display: `Donator (24 dienas - 2.20 ${config.CURRENCY})`,
            length: 24
        },
        {
            value: 3,
            price: 1.65,
            display: `Ultimate (12 dienas - 1.65 ${config.CURRENCY})`,
            length: 12
        }
    ]
    
    const formData = {
        price: {
            attr: {
                type: "select",
                placeholder: "Grupa un tās termiņš",
                size: "3"
            },
            options: [
                ...groupTypes
            ],
            value: 0,
            valid: { isValid: null, messages: [] }
        }
    }

    return <Plugin
        successMessage="Paldies par pirkumu!"
        pluginName="mc_group"
        displayName="Grupas & Statusi"
        formData={formData}
        groupTypes={groupTypes}
    />
}

export default MCGroup
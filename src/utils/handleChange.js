import { isValid } from './isValid'

export const handleChange = (state, input, newValue, groupTypes = null) => {
    // Handling changes in the form - inputs, select etc.
    const currentForm = state.formData
    const currentInput = state.formData[input.id]
    if (input.id === "price") {
        if (groupTypes) {
            newValue = Number(groupTypes.find(item => item.value === Number(newValue)).price)
        } else {
            newValue = Number(newValue)
        }
    }
    const validation = input.rules ? isValid(newValue, input.rules) : { isValid: true, messages: [] }
    let formValid = true
    for (let formInput in state.formData) {
        if (formInput === input.id) {
            formValid = validation.isValid && formValid
        } else {
            formValid = state.formData[formInput].valid.isValid && formValid
        }
    }
    return {
        formData: {
            ...currentForm,
            [input.id]: {
                ...currentInput,
                value: newValue,
                valid: {
                    isValid: validation.isValid,
                    messages: validation.messages
                }
            },
        },
    formValid
    }
}
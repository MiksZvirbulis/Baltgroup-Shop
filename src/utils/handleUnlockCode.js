export const handleUnlockCode = (state, unlockCode) => {
        const newCodeInput = {
            ...state.formData.code,
            attr: {
                placeholder: "Saņemtais kods",
                type: "text"
            },
            value: unlockCode,
            valid: { isValid: true, messages: [] }
        }
        return {
            newState: {
                formData: {
                    ...state.formData,
                    code: newCodeInput,
                    price: { ...state.formData.price, disabled: true }
                },
                paymentInterval: false,
                payment: null
            },
            newCodeInput
        }
}
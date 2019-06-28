import axios from 'axios'
import config from '../../config'

// Get SMS Key depending on price

const getSMSKeyStarted = () => {
    return {
        type: "GET_SMS_KEY"
    }
}

const getSMSKeySuccess = smsKey => {
    return {
        type: "GET_SMS_KEY_SUCCESS",
        smsKey
    }
}

const getSMSKeyError = error => {
    return {
        type: "GET_SMS_KEY_ERROR",
        error
    }
}

export const getSMSKey = price => {
    return async dispatch => {
        dispatch(getSMSKeyStarted())
        try {
            const response = await axios.get(`${config.PAYMENT_API}/?type=post&price=${price}`)
            if (response.data !== "wrongprice") {
                dispatch(getSMSKeySuccess(response.data))
            } else {
                dispatch(getSMSKeyError("Kods tika pieprasīts are nepareizi norādītu cenu..."))
            }
        } catch (error) {
            dispatch(getSMSKeyError(error.message))
        }
    }
}

// Check SMS Key

const checkSMSKeyStarted = () => {
    return {
        type: "CHECK_SMS_KEY"
    }
}

const checkSMSKeySuccess = unlockCode => {
    return {
        type: "CHECK_SMS_KEY_SUCCESS",
        unlockCode
    }
}

const checkSMSKeyError = error => {
    return {
        type: "CHECK_SMS_KEY_ERROR",
        error
    }
}

export const checkSMSKey = smsKey => {
    return async dispatch => {
        dispatch(checkSMSKeyStarted())
        if (config.DEBUG === true) {
            dispatch(checkSMSKeySuccess("123456"))
        } else {
            try {
                const response = await axios.get(`${config.PAYMENT_API}/?type=get&pid=${smsKey}`)
                if (response.status !== 404) {
                    dispatch(checkSMSKeySuccess(response.data))
                }
            } catch (error) {
                const errorMessage = error.response.status === 404 ? "SMS atslēga nav apmaksāta" : error.message
                dispatch(checkSMSKeyError(errorMessage))
            }
        }
    }
}

// Get PayPal Unlock Code

const getPayPalCodeStarted = () => {
    return {
        type: "GET_PAYPAL_CODE"
    }
}

const getPayPalCodeSuccess = unlockCode => {
    return {
        type: "GET_PAYPAL_CODE_SUCCESS",
        unlockCode
    }
}

const getPayPalCodeError = error => {
    return {
        type: "GET_PAYPAL_CODE_ERROR",
        error
    }
}

export const getPayPalKey = paymentId => {
    return async dispatch => {
        dispatch(getPayPalCodeStarted())
        if (config.DEBUG === true) {
            dispatch(getPayPalCodeSuccess("123456"))
        } else {
            try {
                const response = await axios.get(`${config.GATEWAY_API}/?method=paypal&option=paymentinfo&id=${paymentId}`)
                if (response.status !== 404) {
                    dispatch(getPayPalCodeSuccess(response.data.paycode))
                }
            } catch (error) {
                const errorMessage = error.response.status === 404 ? "SMS atslēga nav apmaksāta" : error.message
                dispatch(getPayPalCodeError(errorMessage))
            }
        }
    }
}

// Check SMS Unlock Code

const checkUnlockCodeStarted = () => {
    return {
        type: "CHECK_UNLOCK_CODE"
    }
}

const checkUnlockCodeSuccess = () => {
    return {
        type: "CHECK_UNLOCK_CODE_SUCCESS"
    }
}

const checkUnlockCodeError = error => {
    return {
        type: "CHECK_UNLOCK_CODE_ERROR",
        error
    }
}

export const checkUnlockCode = data => {
    return async dispatch => {
        dispatch(checkUnlockCodeStarted())
        if (config.DEBUG === true) {
            dispatch(checkUnlockCodeSuccess())
        } else {
            try {
                const response = await axios.get(`${config.SHOP_API}/charge/?user=${data.userId}&price=${data.price}&code=${data.unlockCode}`)
                if (response.data.answer === "code_charged_ok") {
                    dispatch(checkUnlockCodeSuccess())
                } else {
                    dispatch(checkUnlockCodeError("SMS atslēga nav apmaksāta"))
                }
            } catch (error) {
                dispatch(checkUnlockCodeError(error.message))
            }
        }
    }
}

// Reset SMS Unlock Code

export const resetUnlockCode = () => {
    return {
        type: "RESET_UNLOCK_CODE"
    }
}
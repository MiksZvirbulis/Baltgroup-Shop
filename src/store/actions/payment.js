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
        try {
            const response = await axios.get(`${config.SHOP_API}/charge/?user=${data.userId}&price=${data.price}&code=${data.unlockCode}`)
            if (response.status !== 404) {
                dispatch(checkUnlockCodeSuccess(response.data))
            }
        } catch (error) {
            if (error.response.status === 404) {
                dispatch(checkUnlockCodeError("SMS atslēga nav apmaksāta"))
            } else {
                dispatch(checkUnlockCodeError(error.message))
            }
        }
    }
}
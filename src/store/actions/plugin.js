import axios from 'axios'
import config from '../../config'

const sendSuccessDataStarted = () => {
    return {
        type: "SEND_SUCCESS_DATA"
    }
}

const sendSuccessDataError = error => {
    return {
        type: "SEND_SUCCESS_DATA_ERROR",
        error
    }
}

const sendSuccessDataSuccess = () => {
    return {
        type: "SEND_SUCCESS_DATA_SUCCESS"
    }
}

export const sendSuccessData = (type, data) => {
    return async dispatch => {
        dispatch(sendSuccessDataStarted())
        try {
            const response = await axios.post(`${config.PAYMENT_API}/${type}`, data)
            if (response.status === 200) {
                dispatch(sendSuccessDataSuccess())
            } else {
                dispatch(sendSuccessDataError(response.error.message))
            }
        } catch (error) {
            dispatch(sendSuccessDataError(error.message))
        }
    }
}
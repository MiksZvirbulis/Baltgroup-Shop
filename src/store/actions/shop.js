import axios from 'axios'

const API_URL = ''

// Get shop data depending on requested slug

const getShopStarted = () => {
    return {
        type: "GET_SHOP"
    }
}

const getShopSuccess = shopData => {
    return {
        type: "GET_SHOP_SUCCESS",
        shopData
    }
}

const getShopError = error => {
    return {
        type: "GET_SHOP_ERROR",
        error
    }
}

export const getShop = slug => {
    return async dispatch => {
        dispatch(getShopStarted())
        try {
            const response = await axios.get(`${API_URL}/?method=shopinfo&slug=${slug}`)
            if (response.status !== 404) {
                dispatch(getShopSuccess(response.data))
            } else {
                dispatch(getShopError(response.error.message))
            }
        } catch (error) {
            if (error.response.status === 404) {
                dispatch(getShopError("Shop was not found..."))
            } else {
                dispatch(getShopError(error.message))
            }
        }
    }
}

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
            const response = await axios.get(`/?type=post&price=${price}`)
            if (response.data !== "wrongprice") {
                dispatch(getSMSKeySuccess(response.data))
            } else {
                //dispatch(getShopError(response.error.message))
                dispatch(getSMSKeyError("Shop was not found..."))
            }
        } catch (error) {
            dispatch(getSMSKeyError(error))
        }
    }
}
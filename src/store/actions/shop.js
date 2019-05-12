import axios from 'axios'
import Cookies from 'universal-cookie'

const API_URL = ''
const API_URL_V2 = ''

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
            const response = await axios.get(`${API_URL_V2}/?type=post&price=${price}`)
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

// Set Player Name

const setPlayerNameStarted = () => {
    return {
        type: "SET_PLAYER_NAME"
    }
}

const setPlayerNameSuccess = playerName => {
    return {
        type: "SET_PLAYER_NAME_SUCCESS",
        playerName
    }
}

const setPlayerNameError = error => {
    return {
        type: "SET_PLAYER_NAME_ERROR",
        error
    }
}

export const setPlayerName = playerName => {
    return async dispatch => {
        dispatch(setPlayerNameStarted())
        const cookies = new Cookies()
        try {
            await cookies.set("playerName", playerName, { path: "/" })
            dispatch(setPlayerNameSuccess(playerName))
        } catch (error) {
            dispatch(setPlayerNameError(error))
        }
    }
}

// Get Player Name

const getPlayerNameStarted = () => {
    return {
        type: "GET_PLAYER_NAME"
    }
}

const getPlayerNameSuccess = playerName => {
    return {
        type: "GET_PLAYER_NAME_SUCCESS",
        playerName
    }
}

const getPlayerNameError = error => {
    return {
        type: "GET_PLAYER_NAME_ERROR",
        error
    }
}

export const getPlayerName = () => {
    return async dispatch => {
        dispatch(getPlayerNameStarted())
        const cookies = new Cookies()
        try {
            let playerName = await cookies.get("playerName")
            playerName = playerName === undefined ? null : playerName
            dispatch(getPlayerNameSuccess(playerName))
        } catch (error) {
            dispatch(getPlayerNameError(error))
        }
    }
}
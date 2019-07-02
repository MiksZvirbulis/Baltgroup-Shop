import axios from 'axios'
import Cookies from 'universal-cookie'
import config from '../../config'

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
            const response = await axios.get(`${config.SHOP_API}/reactapi/?shop=${slug}&method=maininfo`)
            if (response.status !== 404) {
                if (!response.data.errors) {
                    dispatch(getShopSuccess({ ...response.data, errors: [] }))
                } else {
                    dispatch(getShopError(response.data.errors[0]))
                }
            } else {
                dispatch(getShopError(response.error.message))
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                dispatch(getShopError("Shop was not found..."))
            } else {
                dispatch(getShopError(error.message))
            }
        }
    }
}

// Set Player Name

const setPlayerNameStarted = () => {
    return {
        type: "SET_PLAYER_NAME"
    }
}

const setPlayerNameSuccess = (playerName, serverId) => {
    return {
        type: "SET_PLAYER_NAME_SUCCESS",
        playerName,
        serverId
    }
}

const setPlayerNameError = error => {
    return {
        type: "SET_PLAYER_NAME_ERROR",
        error
    }
}

export const setPlayerName = (playerName, serverId, shopName) => {
    return async dispatch => {
        dispatch(setPlayerNameStarted())
        const cookies = new Cookies()
        try {
            await cookies.set("playerName", playerName, { path: "/" })
            await cookies.set("serverId", serverId, { path: "/" })
            await cookies.set("shopName", shopName, { path: "/" })
            dispatch(setPlayerNameSuccess(playerName, serverId))
        } catch (error) {
            dispatch(setPlayerNameError(error.message))
        }
    }
}

// Get Player Name

const getPlayerNameStarted = () => {
    return {
        type: "GET_PLAYER_NAME"
    }
}

const getPlayerNameSuccess = (playerName, serverId) => {
    return {
        type: "GET_PLAYER_NAME_SUCCESS",
        playerName,
        serverId
    }
}

const getPlayerNameError = error => {
    return {
        type: "GET_PLAYER_NAME_ERROR",
        error
    }
}

export const getPlayerName = shopName => {
    return async dispatch => {
        dispatch(getPlayerNameStarted())
        const cookies = new Cookies()
        try {
            let playerName = await cookies.get("playerName")
            let serverId = await cookies.get("serverId")
            let prevShopName = await cookies.get("shopName")
            playerName = playerName === undefined ? null : playerName
            serverId = serverId === undefined ? null : serverId
            prevShopName = prevShopName === undefined ? null : prevShopName

            if (prevShopName !== shopName) {
                await cookies.remove("serverId", { path: '/' })
                serverId = null
            }
            dispatch(getPlayerNameSuccess(playerName, serverId))
        } catch (error) {
            dispatch(getPlayerNameError(error.message))
        }
    }
}

// Remove Player Name

const removePlayerNameStarted = () => {
    return {
        type: "REMOVE_PLAYER_NAME"
    }
}

const removePlayerNameSuccess = () => {
    return {
        type: "REMOVE_PLAYER_NAME_SUCCESS"
    }
}

const removePlayerNameError = error => {
    return {
        type: "REMOVE_PLAYER_NAME_ERROR",
        error
    }
}

export const removePlayerName = () => {
    return async dispatch => {
        dispatch(removePlayerNameStarted())
        const cookies = new Cookies()
        try {
            const playerName = await cookies.get("playerName")
            if (playerName === undefined) {
                dispatch(removePlayerNameError("Spēlētāja vārds netika atrasts"))
            } else {
                cookies.remove("playerName", { path: '/' })
                dispatch(removePlayerNameSuccess())
            }
        } catch (error) {
            dispatch(removePlayerNameError(error.message))
        }
    }
}
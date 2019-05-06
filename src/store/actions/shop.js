import axios from 'axios'

const API_URL = ''

export const getShopStarted = () => {
    return {
        type: "GET_SHOP"
    }
}

export const getShopSuccess = shopData => {
    return {
        type: "GET_SHOP_SUCCESS",
        shopData
    }
}

export const getShopError = error => {
    return {
        type: "GET_SHOP_ERROR",
        error
    }
}

export const getShop = slug => {
    return async dispatch => {
        dispatch(getShopStarted())
        try {
            const response = await axios.get(`${API_URL}/?method=shopinfo&sid=${slug}`)
            if (response.data.id !== null) {
                dispatch(getShopSuccess(response.data))
            } else {
                //dispatch(getShopError(response.error.message))
                dispatch(getShopError("Shop was not found..."))
            }
        } catch (error) {
            dispatch(getShopError(error))
        }
    }
}
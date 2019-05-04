//import axios from 'axios'

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

export const getShopError = () => {
    return {
        type: "GET_SHOP_ERROR"
    }
}

export const getShop = slug => {
    return dispatch => {
        dispatch(getShopStarted())
        // API request
        dispatch(getShopSuccess(
            {
                name: "FLIP",
                slug: "flip",
                plugins: ['Donate']
            }
        ))
    }
}
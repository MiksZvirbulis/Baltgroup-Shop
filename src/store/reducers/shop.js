import { updateObject } from '../../utils/updateObject'

const initialState = {
    shopData: {},
    error: null
}

export default function shop(state = initialState, action) {
    switch (action.type) {
        case 'GET_SHOP':
        return updateObject(state, { shopData: {}, error: null })
        case 'GET_SHOP_ERROR':
        return updateObject(state, { error: action.error })
        case 'GET_SHOP_SUCCESS':
        return updateObject(state, { shopData: action.shopData })
        default:
        return state
    }
}
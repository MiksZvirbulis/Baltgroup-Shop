import { updateObject } from '../../utils/updateObject'

const initialState = {
    shopData: null,
    error: null,
    smsKey: null,
    playerName: null
}

export default function shop(state = initialState, action) {
    switch (action.type) {
        case 'GET_SHOP':
        return updateObject(state, { shopData: null, error: null })
        case 'GET_SHOP_ERROR':
        return updateObject(state, { error: action.error })
        case 'GET_SHOP_SUCCESS':
        return updateObject(state, { shopData: action.shopData })
        case 'GET_SMS_KEY':
        return updateObject(state, { error: null, smsKey: null })
        case 'GET_SMS_KEY_ERROR':
        return updateObject(state, { error: action.error })
        case 'GET_SMS_KEY_SUCCESS':
        return updateObject(state, { smsKey: action.smsKey })
        case 'SET_PLAYER_NAME':
        return updateObject(state, { error: null, playerName: null })
        case 'SET_PLAYER_NAME_ERROR':
        return updateObject(state, { error: action.error })
        case 'SET_PLAYER_NAME_SUCCESS':
        return updateObject(state, { playerName: action.playerName })
        case 'GET_PLAYER_NAME':
        return updateObject(state, { error: null, playerName: null })
        case 'GET_PLAYER_NAME_ERROR':
        return updateObject(state, { error: action.error })
        case 'GET_PLAYER_NAME_SUCCESS':
        return updateObject(state, { playerName: action.playerName })
        default:
        return state
    }
}
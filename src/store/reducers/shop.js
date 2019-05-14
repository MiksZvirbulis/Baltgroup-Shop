import { updateObject } from '../../utils/updateObject'

const initialState = {
    shopData: null,
    error: null,
    smsKey: null,
    smsKeyPaid: false,
    playerName: null
}

export default function shop(state = initialState, action) {
    switch (action.type) {
        // Get shop info
        case 'GET_SHOP':
        return updateObject(state, { shopData: null, error: null })
        case 'GET_SHOP_ERROR':
        return updateObject(state, { error: action.error })
        case 'GET_SHOP_SUCCESS':
        return updateObject(state, { shopData: action.shopData })
        // Get SMS key for specific price
        case 'GET_SMS_KEY':
        return updateObject(state, { error: null, smsKey: null })
        case 'GET_SMS_KEY_ERROR':
        return updateObject(state, { error: action.error })
        case 'GET_SMS_KEY_SUCCESS':
        return updateObject(state, { smsKey: action.smsKey })
        // Check SMS key
        case 'CHECK_SMS_KEY':
        return updateObject(state, { error: null, smsKeyPaid: false })
        case 'CHECK_SMS_KEY_ERROR':
        return updateObject(state, { smsKeyPaid: false })
        case 'CHECK_SMS_KEY_SUCCESS':
        return updateObject(state, { smsKeyPaid: true })
        // Set player name used for shopping
        case 'SET_PLAYER_NAME':
        return updateObject(state, { error: null, playerName: null })
        case 'SET_PLAYER_NAME_ERROR':
        return updateObject(state, { error: action.error })
        case 'SET_PLAYER_NAME_SUCCESS':
        return updateObject(state, { playerName: action.playerName })
        // Get player name used for shopping
        case 'GET_PLAYER_NAME':
        return updateObject(state, { error: null, playerName: null })
        case 'GET_PLAYER_NAME_ERROR':
        return updateObject(state, { error: action.error })
        case 'GET_PLAYER_NAME_SUCCESS':
        return updateObject(state, { playerName: action.playerName })
        // Remove player name
        case 'REMOVE_PLAYER_NAME':
        return updateObject(state, { error: null })
        case 'REMOVE_PLAYER_NAME_ERROR':
        return updateObject(state, { error: action.error })
        case 'REMOVE_PLAYER_NAME_SUCCESS':
        return updateObject(state, { playerName: null })
        default:
        return state
    }
}
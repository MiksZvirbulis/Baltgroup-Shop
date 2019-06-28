import { updateObject } from '../../utils/updateObject'

const initialState = {
    error: null,
    smsKey: null,
    unlockCode: null,
    unlockCodePaid: false
}

export default function payment(state = initialState, action) {
    switch (action.type) {
        // Get SMS key for specific price
        case 'GET_SMS_KEY':
        return updateObject(state, { error: null, smsKey: null })
        case 'GET_SMS_KEY_ERROR':
        return updateObject(state, { error: action.error })
        case 'GET_SMS_KEY_SUCCESS':
        return updateObject(state, { smsKey: action.smsKey })
        // Check SMS key
        case 'CHECK_SMS_KEY':
        return updateObject(state, { error: null, unlockCode: null })
        case 'CHECK_SMS_KEY_ERROR':
        return updateObject(state, { error: action.error })
        case 'CHECK_SMS_KEY_SUCCESS':
        return updateObject(state, { unlockCode: action.unlockCode })
        // Check SMS Unlock Code
        case 'GET_PAYPAL_CODE':
        return updateObject(state, { error: null, unlockCode: null })
        case 'GET_PAYPAL_CODE_ERROR':
        return updateObject(state, { error: action.error })
        case 'GET_PAYPAL_CODE_SUCCESS':
        return updateObject(state, { unlockCode: action.unlockCode })
        // Check SMS Unlock Code
        case 'CHECK_UNLOCK_CODE':
        return updateObject(state, { error: null, unlockCodePaid: false })
        case 'CHECK_UNLOCK_CODE_ERROR':
        return updateObject(state, { error: action.error })
        case 'CHECK_UNLOCK_CODE_SUCCESS':
        return updateObject(state, { unlockCodePaid: true })
        // Reset SMS Unlock Code
        case 'RESET_UNLOCK_CODE':
        return updateObject(state, { smsKey: null, unlockCode: null, unlockCodePaid: false })
        default:
        return state
    }
}
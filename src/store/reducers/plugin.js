import { updateObject } from '../../utils/updateObject'

const initialState = {
    error: null
}

export default function plugin(state = initialState, action) {
    switch (action.type) {
        // Get SMS key for specific price
        case 'SEND_SUCCESS_DATA':
        return updateObject(state, { error: null })
        case 'SEND_SUCCESS_DATA_ERROR':
        return updateObject(state, { error: action.error })
        case 'SEND_SUCCESS_DATA_SUCCESS':
        return state
        default:
        return state
    }
}
import { combineReducers } from 'redux'
import shop from './shop'
import payment from './payment'

export default combineReducers({
    shop,
    payment
})
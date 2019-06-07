import { combineReducers } from 'redux'
import shop from './shop'
import payment from './payment'
import plugin from './plugin'

export default combineReducers({
    shop,
    payment,
    plugin
})
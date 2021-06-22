import { combineReducers } from 'redux'
import loginReducer from './login/loginReducer'
import menuReducer from './menu/menuReducer'

const rootReducer = combineReducers({
  login: loginReducer,
  menu: menuReducer
})

export default rootReducer

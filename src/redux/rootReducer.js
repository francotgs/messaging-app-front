import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import loginReducer from './login/loginReducer'
import menuReducer from './menu/menuReducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['login','menu']
}

const rootReducer = combineReducers({
  login: loginReducer,
  menu: menuReducer
})

export default persistReducer(persistConfig, rootReducer);

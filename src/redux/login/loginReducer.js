import { USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS } from './loginTypes'

const initialState = {
  form:{
    userId: '',
    username: '',
    password: ''
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      console.log('Login success');
      return {
        ...state,
        form: {
          ...state.form,
          userId: action.payload.userId,
          username: action.payload.user,
          password: action.payload.pass
        }
      }
    case USER_LOGOUT_SUCCESS:
      console.log('Logout success');
      return {
        ...state,
        form: {
          ...state.form,
          userId: action.payload.userId,
          username: action.payload.user,
          password: action.payload.pass
        }
      }
    default: return state
  }
}

export default reducer

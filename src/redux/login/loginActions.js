import axios from 'axios'
import { USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS } from './loginTypes'

const loginUrl = "http://localhost:3001/login";
const userUrl = "http://localhost:3001/users";

export const iniciarSesion = ({ user, pass }) => {
  return (dispatch) => {
    axios
      .post(loginUrl, { username: user, password: pass })
      .then(response => {
        console.log(response.data);
        return response.data;
      })
      .then(response => {
        if (response.data) {
          const userId = response.data.id;
          console.log(userId);
          dispatch(userLoginSuccess({ user, pass, userId }));
          //window.location.href = "./menu";
        }
      })
      .catch(error => {
        alert('El usuario o la contraseña no son correctos');
      })
  }
}

export const register = ({ user, pass }) => {
  return (dispatch) => {
    axios
      .post(userUrl, {
        username: user,
        password: pass
      })
      .then(response => {
        const userId = response.data.id;
        dispatch(userLoginSuccess({ user, pass, userId }))
        //window.location.href = "./menu";
      })
      .catch(error => {
        alert('El usuario ya existe');
      })
  }
}

export const userLoginSuccess = ({ user, pass, userId }) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: { user: user, pass: pass, userId: userId }
  }
}

export const userLogoutSuccess = () => {
  return {
    type: USER_LOGOUT_SUCCESS,
    payload: { user: '', pass: '', userId: '' }
  }
}

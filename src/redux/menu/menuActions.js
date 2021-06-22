import axios from 'axios'
import { MSG_SEND, ERASE_MSG, GUARDAR_MENSAJES, GUARDAR_USUARIOS } from './menuTypes'

const mensajesUrl = "http://localhost:3001/messages";
const conversationsUrl = "http://localhost:3001/conversations";
const usernamesUrl = "http://localhost:3001/usernames";

export const enviarMensaje = ({ msg, receiver }) => {
  return (dispatch, getState) => {
    const {userId} = getState().login.form;
    console.log(userId);
    const receiverInt = parseInt(receiver)
    axios
      .post(mensajesUrl, {
        content: msg,
        receiverId: receiverInt,
        senderId: userId
      })
      .then(response => {
        console.log(response.data);
        dispatch(msgSend({ msg, receiver }));
        dispatch(traerMensajes());
      })
      .catch(error => {
        alert('Error');
      })
  }
}

export const traerMensajes = () => {
  return (dispatch, getState) => {
    const {userId} = getState().login.form;
    const {receiverId} = getState().menu.message;
    if (receiverId !== "") {
      axios
      .get(conversationsUrl, {
        params: {
          receiverId: receiverId,
          senderId: userId
      }})
      .then(response => {
        console.log(response.data);
        dispatch(guardarMensajes(response.data));
      })
      .catch(error => {
        alert('Error al traer mensajes');
      })
    }
  }
}

export const traerUsuarios = () => {
  return (dispatch) => {   
    axios
      .get(usernamesUrl)
      .then(response => {
        console.log(response.data);
        dispatch(guardarUsuarios(response.data));
      })
      .catch(error => {
        alert('Error al traer users');
      })
  }
}

export const msgSend = ({ msg, receiver }) => {
  return {
    type: MSG_SEND,
    payload: { msg: msg, receiver: receiver }
  }
}

export const eraseMsg = () => {
  return {
    type: ERASE_MSG
  }
}

export const guardarMensajes = (mensajes) => {
  return {
    type: GUARDAR_MENSAJES,
    payload: mensajes
  }
}

export const guardarUsuarios = (usuarios) => {
  return {
    type: GUARDAR_USUARIOS,
    payload: usuarios
  }
}
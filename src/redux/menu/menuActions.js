import axios from 'axios'
import { MSG_SEND, ERASE_MSG, GUARDAR_MENSAJES, GUARDAR_USUARIOS, BORRAR_MENSAJES, BORRAR_USUARIOS } from './menuTypes'

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
        dispatch(traerMensajes(receiver));
      })
      .catch(error => {
        alert('Error, seleccionar destinatario');
      })
  }
}

export const traerMensajes = (receiver) => {
  return (dispatch, getState) => {
    const {userId} = getState().login.form;
      const receiverId = parseInt(receiver);
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

export const userLogout = () => {
  return (dispatch) => {
    dispatch(eraseMsg());
    dispatch(borrarMensajes());
    dispatch(borrarUsuarios());
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

export const borrarMensajes = () => {
  return {
    type: BORRAR_MENSAJES
  }
}

export const borrarUsuarios = () => {
  return {
    type: BORRAR_USUARIOS
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
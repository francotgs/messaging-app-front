import { MSG_SEND, ERASE_MSG, GUARDAR_MENSAJES, GUARDAR_USUARIOS, BORRAR_MENSAJES, BORRAR_USUARIOS } from './menuTypes'

const initialState = {
  message:{
    content: '',
    receiverId: '',
  },
  messages: [],
  usuarios: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MSG_SEND:
      return {
        ...state,
        message: {
          ...state.message,
          content: action.payload.msg,
          receiverId: action.payload.receiver
        }
      }
    case ERASE_MSG:
      return {
        ...state,
        message: {
          ...state.message,
          content: '',
          receiverId: ''
        }
      }
    case GUARDAR_MENSAJES:
      return {
        ...state,
        messages: action.payload
      }
    case GUARDAR_USUARIOS:
      return {
        ...state,
        usuarios: action.payload
      }
    case BORRAR_MENSAJES:
      return {
        ...state,
        messages: []
      }
    case BORRAR_USUARIOS:
      return {
        ...state,
        usuarios: []
      }
    default: return state
  }
}

export default reducer

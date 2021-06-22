import React, { useState } from 'react'
import { connect } from 'react-redux'
import { enviarMensaje, userLogoutSuccess, traerMensajes, traerUsuarios, userLogout } from '../redux'
import { Redirect } from 'react-router-dom'
import '../css/Menu.css';
//import 'bootstrap/dist/css/bootstrap.min.css';

function Menu(props) {

    const [receiver, setReceiver] = useState("")
    const [msg, setMsg] = useState("")
    const authuser = props.authuser;
    const usuarios = props.usuarios;
    const messages = props.messages;
    
    if (authuser === '') return <Redirect to='/' />
    return (
        <div className="row">
            <div className="col s3">
                <div className="container">
                    <br />
                    <br />
                    <button
                        type="button"
                        className="waves-effect waves-light btn grey darken-1"
                        onClick={() => { props.traerUsuarios() }}>
                        Mostrar Usuarios
                    </button>
                    <div className="users">
                        <ul>
                            {usuarios?.map((user) => (
                            <li key={user.username}>
                                    {user.username}
                            </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col s9">
                <div className="container">
                    <h3 className="grey-text text-darken-3">Bienvenido @{props.username}</h3>
                </div>
                <div className="container">
                    <div className="container-input">
                        <div className="input-field">
                            <input
                                id="id"
                                type="text"
                                name="receiverId"
                                value={receiver}
                                onChange={e => setReceiver(e.target.value)}
                            />
                            <label htmlFor="id">Id del destinatario:</label>
                        </div>
                    </div>
                    <div className="container-mensajes">
                        <div className="messages">
                            <ul>
                                {messages?.map((message) => (
                                <li key={message.date}>
                                    {message.content}
                                </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <br />
                    <div className="container-mensaje">
                        <div className="container-input">
                            <div className="input-field">
                                <input
                                    id="message"
                                    type="text"
                                    name="content"
                                    value={msg}
                                    onChange={e => setMsg(e.target.value)}
                                />
                                <label htmlFor="message">Mensaje:</label>
                            </div>
                        </div>
                        <br />
                        <br />
                        <button
                            type="button"
                            className="waves-effect waves-light btn blue"
                            onClick={() => props.enviarMensaje({ msg, receiver })}>
                            Enviar mensaje
                        </button>
                    </div>
                </div>
                <div className="cerrarSesion">
                    <button
                        type="button"
                        className="waves-effect waves-light btn grey darken-1"
                        onClick={() => { props.userLogoutSuccess(); props.userLogout() }}>
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        authuser: state.login.form.userId,
        username: state.login.form.username,
        usuarios: state.menu.usuarios,
        messages: state.menu.messages
    }
}

const mapDispatchToProps = dispatch => {
    return {
        enviarMensaje: ({ msg, receiver }) => dispatch(enviarMensaje({ msg, receiver })),
        userLogoutSuccess: () => dispatch(userLogoutSuccess()),
        traerMensajes: () => dispatch(traerMensajes()),
        traerUsuarios: () => dispatch(traerUsuarios()),
        userLogout: () => dispatch(userLogout())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu)

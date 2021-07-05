import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { enviarMensaje, traerMensajes, traerUsuarios } from '../redux';
import { Redirect } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import '../css/Menu.css';
import axios from 'axios';
//import 'bootstrap/dist/css/bootstrap.min.css';

function Menu(props) {

    const [receiver, setReceiver] = useState("")
    const [msg, setMsg] = useState("")
    const [search, setSearch] = useState("")
    const [gralSearch, setGeneralSearch] = useState("")
    const [file, setFile] = useState("")
    const authuser = props.authuser;
    const usuarios = props.usuarios;
    const messages = props.messages;
    let optionUsers = usuarios?.filter((item) => {
        if(item.id===authuser){
            return false;
        }
        return true;
    }).map(({id, username}) => ({value:id, label:username}));
    console.log(optionUsers);

    useEffect(() => {
        console.log(receiver)
        if (receiver !== ""){
            props.traerMensajes(receiver)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [receiver]);

    useEffect(() => {
        props.traerUsuarios();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fileUploadHandler = () => {
        const fd = new FormData();
        fd.append('file', file);
        axios.post('http://localhost:3001/CargarImagen', fd)
            .then(res => {
                console.log(res);
                const filename = res.data.filename;
                axios
                .post("http://localhost:3001/messages", {
                    content: filename,
                    receiverId: receiver,
                    senderId: authuser,
                    isfile: true,
                })
                .then(response => {
                    console.log(response);
                    props.traerMensajes(receiver);
                })
                .catch(error => {
                    alert('Error para enviar mensaje de imagen');
                })
            })
            .catch(error => {
                alert('El archivo seleccionado no es válido');
            })
    };

    if (authuser === '') return <Redirect to='/' />
    return (
        <div className="row">
            <div className="col s2">
                <div className="containerIzq">
                    <br />
                    <br />
                    {/* <button
                        type="button"
                        className="waves-effect waves-light btn grey darken-1"
                        onClick={() => { props.traerUsuarios() }}>
                        Mostrar Usuarios
                    </button> */}
                    <div className="users">
                        <ul>
                            {usuarios?.map((user) => {
                                if (user.id !== props.authuser) {
                                    return (
                                        <li key={user.id}>
                                            <button
                                                type="button"
                                                className="waves-effect waves-light btn blue"
                                                value={user.username}
                                                onClick={() => setReceiver(user.id)}>
                                                {user.username}
                                            </button>
                                            <br />
                                            <br />
                                        </li>
                                    );
                                } return null;
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col s6">
                <div className="container">
                    <h3 className="grey-text text-darken-3">Bienvenido @{props.username}</h3>
                    <br />
                    <Select
                        className="dropdown"
                        placeholder="Seleccionar destinatario"
                        components={makeAnimated()}
                        options={optionUsers}
                        onChange={e => setReceiver(e.value)}
                        isSearchable
                    />
                    <div className="input-field">
                        <input
                            id="search"
                            type="text"
/*                          placeholder="Buscar mensajes..."
 */                         onChange={e => setSearch(e.target.value)}
                        />
                        <label htmlFor="search">Buscar mensajes:</label>
                    </div>
                    {/* <div className="container-input">
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
                    </div> */}
                    <div className="container-mensajes">
                        <div className="messages">
                                {messages?.filter((message)=>{
                                    if (search === "") {
                                        return message
                                    } else if (message.content.toLowerCase().includes(search.toLowerCase())){
                                        return message
                                    } return null
                                }).map((message, key) => (
                                <div className="message" key={key}>
                                    <p className={message.senderId===props.authuser ?
                                        "msg_der card-panel blue white-text":
                                        "msg_izq card-panel blue white-text"}
                                    >
                                        <span className="text">
                                            {(() => {
                                                if (message.isfile === true) {
                                                    return (
                                                        <button
                                                            type="button"
                                                            className="waves-effect waves-light btn blue"
                                                            value={message.content}
                                                            onClick={e => {
                                                                    e.preventDefault();
                                                                    var myUrl = "http://localhost:3001/files/" + message.content;
                                                                    window.location.href=myUrl;
                                                                    }}
                                                        >
                                                            descargar {message.content}
                                                        </button>
                                                    );
                                                } return message.content;                                                
                                            })()}
                                        </span>
                                        <span className="timestamp">
                                            <span className="intimestamp">
                                                {(() => {
                                                    var date2 = new Date(message.date);
                                                    var hours = date2.getHours();
                                                    var minutes = date2.getMinutes();
                                                    if(minutes<10) {
                                                        minutes='0'+minutes;
                                                    }
                                                    if (hours<10) {
                                                        hours='0'+hours;
                                                    }
                                                    return <span>{hours}:{minutes}</span>
                                                })()}
                                            </span>
                                        </span>
                                    </p>
                                </div>
                                ))}
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
                        <button
                            type="button"
                            className="waves-effect waves-light btn blue"
                            onClick={() => {
                                props.enviarMensaje({ msg, receiver });
                                setMsg("")
                                }}>
                            Enviar mensaje
                        </button>
                        <div className="input-field">
                            <input
                                type="file"
                                onChange={e => setFile(e.target.files[0])}
                            />
                        </div>
                        <button
                            type="button"
                            className="waves-effect waves-light btn blue"
                            onClick={fileUploadHandler}>
                            Cargar archivo
                        </button>
                    </div>
                </div>
            </div>
            <div className="col s4">
                <div className="containerDer">
                    <br />
                    <div className="input-field">
                        <input
                            id="generalsearch"
                            type="text"
                            onChange={e => setGeneralSearch(e.target.value)}
                        />
                        <label htmlFor="generalsearch">Búsqueda general:</label>
                    </div>
                    <h6 className="grey-text text-darken-3">Usuarios:</h6>
                    <div className="container-mensajes">
                        <div className="messages-der">
                        <ul>
                            {usuarios?.filter((user)=>{
                                    if (gralSearch === "") {
                                        return null
                                    } else if (user.username.toLowerCase().includes(gralSearch.toLowerCase())){
                                        return user
                                    } return null
                                }).map((user) => {
                                if (user.id !== props.authuser) {
                                    return (
                                        <li key={user.id}>
                                            <button
                                                type="button"
                                                className="waves-effect waves-light btn blue"
                                                value={user.username}
                                                onClick={() => setReceiver(user.id)}>
                                                {user.username}
                                            </button>
                                            <br />
                                            <br />
                                        </li>
                                    );
                                } return null;
                            })}
                        </ul>
                        </div>
                    </div>
                    <h6 className="grey-text text-darken-3">Mensajes:</h6>
                    <div className="container-mensajes">
                        <div className="messages-der">
                                {messages?.filter((message)=>{
                                    if (gralSearch === "") {
                                        return null
                                    } else if (message.content.toLowerCase().includes(gralSearch.toLowerCase())){
                                        return message
                                    } return null
                                }).map((message, key) => (
                                <div className="message" key={key}>
                                    <p className={message.senderId===props.authuser ?
                                        "msg_der card-panel blue white-text":
                                        "msg_izq card-panel blue white-text"}
                                    >
                                        <span className="text">
                                            {message.content}
                                        </span>
                                        <span className="timestamp">
                                            <span className="intimestamp">
                                                {(() => {
                                                    var date2 = new Date(message.date);
                                                    var hours = date2.getHours();
                                                    var minutes = date2.getMinutes();
                                                    if(minutes<10) {
                                                        minutes='0'+minutes;
                                                    }
                                                    if (hours<10) {
                                                        hours='0'+hours;
                                                    }
                                                    return <span>{hours}:{minutes}</span>
                                                })()}
                                            </span>
                                        </span>
                                    </p>
                                </div>
                                ))}
                        </div>
                    </div>
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
        traerMensajes: (receiver) => dispatch(traerMensajes(receiver)),
        traerUsuarios: () => dispatch(traerUsuarios()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu)

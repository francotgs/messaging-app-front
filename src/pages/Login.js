import React, { useState } from 'react'
import { connect } from 'react-redux'
import { iniciarSesion, register } from '../redux'
import { Redirect } from 'react-router-dom'
import '../css/Login.css';
//import 'bootstrap/dist/css/bootstrap.min.css';

function Login(props) {

    const [pass, setPass] = useState("")
    const [user, setUser] = useState("")

    const { authuser } = props;
    if (authuser) return <Redirect to='/menu' />
    return (
        <div className="containerPrincipal">
            <div className="containerSecundario">
                <div className="form-group">
                    <label>Usuario: </label>
                    <br />
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={user}
                        onChange={e => setUser(e.target.value)}
                    />
                    <br />
                    <label>Contraseña: </label>
                    <br />
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={pass}
                        onChange={e => setPass(e.target.value)}
                    />
                    <br />
                    <br />
                    <button
                        type="button"
                        className="waves-effect waves-light btn blue"
                        onClick={() => props.iniciarSesion({user, pass})}>
                        Iniciar Sesión
                    </button>
                    <br />
                    <br />
                    <button
                        type="button"
                        className="waves-effect waves-light btn blue"
                        onClick={() => props.register({user, pass})}>
                        Registrarme
                    </button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        authuser: state.login.form.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        iniciarSesion: ({user, pass}) => dispatch(iniciarSesion({user, pass})),
        register: ({user, pass}) => dispatch(register({user, pass}))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)

import React, { Component } from 'react';
import '../css/Menu.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Menu extends Component {

    state = {
        message: {
            content: '',
            senderId: '',
            receiverId: '',
        }
    }

    cerrarSesion = () => {
        window.location.href = './';
    }

    handleChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    render() {
        return (
            <div>
                <div className="containerPrincipal">
                    <div className="containerSecundario">
                        <div className="form-group">
                            <label>Id del destinatario:</label>
                            <br />
                            <input
                                type="text"
                                className="form-control"
                                name="senderId"
                                onChange={this.handleChange}
                            />
                            <br />
                            <label>Mensaje:</label>
                            <br />
                            <input
                                type="password"
                                className="form-control"
                                name="content"
                                onChange={this.handleChange}
                            />
                            <br />
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => this.cerrarSesion()}>
                                Enviar mensaje
                            </button>
                        </div>
                    </div>
                </div>
                <div className="cerrarSesion">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => this.cerrarSesion()}>
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        );
    }
}

export default Menu;
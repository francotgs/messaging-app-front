import React, { Component } from 'react';

class Menu extends Component {
    cerrarSesion=()=>{
        window.location.href='./';
    }
    
    render() {
        return (
            <div>
                Menu Principal
                <br />
                <button onClick={()=>this.cerrarSesion()}>Cerrar Sesión</button>
            </div>
        );
    }
}

export default Menu;
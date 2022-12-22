import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class PageInicio extends Component {
    state = {
        estaLogin: false,
        
      }

      componentDidMount() {
        if(cookies.get("usu_nombres")){
          this.setState({estaLogin:true})
        }else{
          this.setState({estaLogin:false})
        }
      }

    cerrarSesion() {
        cookies.remove("usu_id", { path: "/" })
        cookies.remove("usu_email", { path: "/" })
        cookies.remove("usu_clave", { path: "/" })
        cookies.remove("usu_nomrbes", { path: "/" })
        cookies.remove("usu_apellidos", { path: "/" })
        //cookies.remove("usu_rol",{path:"/"})
        this.setState({ estaLogin: false })
    }
    render() {
        return (
            <div>
                <div className="user.png">
                    <img src="./user.png" className="mx-right" width={250} height={250} alt='' />
                    <div className="login-body">
                        <h5 className="card-title">Login</h5>
                        <p className="card-text">Click en el boton para entrar al login.</p>
                        <Link class="btn btn-primary" to='/PageLogin'>Login</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default PageInicio
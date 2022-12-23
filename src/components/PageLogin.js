import axios from "axios";
import { Component } from "react"
import '../css/Login.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Cookies from "universal-cookie"
//require('dotenv').config()

const urlLogin='https://backend-deportes-production.up.railway.app/api/usuarios'

const cookies = new Cookies();

class PageLogin extends Component {
    state={
        form:{
            username: '',
            password: ''
        }
    }
    

    handleChange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]:e.target.value
            }
        })
    }

    iniciarSesion=async()=>{
        let name=this.state.form.username
        let pwd=this.state.form.password
        if(name.length<=0 || pwd.length<=0){
            alert('Se requieren todos los datos')
            return "Datos Vacios"
        }

        await axios.get(urlLogin+"/"+name+"/"+pwd)
        .then(response=>{
            return response.data
        }).then(response=>{
            if(response.length>0){
                var resp=response[0]
                cookies.set("usu_id",resp.usu_id,{path:"/"})
                cookies.set("usu_email",resp.usu_email,{path:"/"})
                cookies.set("usu_clave",resp.usu_clave,{path:"/"})
                cookies.set("usu_nombres",resp.usu_nombres,{path:"/"})
                cookies.set("usu_apellidos",resp.usu_apellidos,{path:"/"})
                cookies.set("usu_rol",resp.usu_rol,{path:"/"})
                alert("Bienvenid@ "+resp.usu_nombres)

                window.location.href='./'
            }else{
                alert("Verificar usario y/o Clave")
            }
        }).catch(error=>{
            console.log(error)
        })

    }

    render(){
        return(
            <div className="containerPrincipal">
                <div className="containerSecundario">
                    <div className="form-group">
                        <label>Usuario: </label>
                        <br />
                        <input type="text" className="form-control" name="username" onChange={this.handleChange} />
                        <br />
                        <label>Contraseña: </label>
                        <br />
                        <input type="password" className="form-control" name="password" onChange={this.handleChange} />
                        <br />
                        <button className="btn btn-primary" onClick={()=> this.iniciarSesion()}>Iniciar Sesion</button>
                    </div>
                </div>
            </div>

        )
    }

}

export default PageLogin
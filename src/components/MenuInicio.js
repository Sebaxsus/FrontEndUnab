import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faL, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Cookies from "universal-cookie";

const url = 'http://localhost:9000/api/eventos'
const cookies = new Cookies();

class MenuInicio extends Component {
  state = {
    estaLogin: false,
    data: [],
    form: {
      eve_id: '',
      eve_fecha: '',
      //reg_fecha:'',
      equ_equipo1: '',
      equ_equipo2: '',
      eve_marca1: '',
      eve_marca2: '',
      dep_id: '',
      eve_descrip: ''
      //usu_id:''
    }
  }

  peticionGet = () => {
    delete this.state.form.eve_id
    axios.get(url).then(response => {
      this.setState({ data: response.data })
    }).catch(error => {
      console.log(error.message)
    })
  }

  componentDidMount() {
    if(cookies.get("usu_nombres")){
      this.setState({estaLogin:true})
    }else{
      this.setState({estaLogin:false})
    }
    this.peticionGet();
  }

  cerrarSesion(){
    cookies.remove("usu_id",{path:"/"})
    cookies.remove("usu_email",{path:"/"})
    cookies.remove("usu_clave",{path:"/"})
    cookies.remove("usu_nomrbes",{path:"/"})
    cookies.remove("usu_apellidos",{path:"/"})
    cookies.remove("usu_rol",{path:"/"})
    this.setState({estaLogin:false})
  }

  render() {
    return (<div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">

          <Link className="navbar-brand" to='/'>
            <img src='./balones.png' width={60} height={40} alt="" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav" >
            <ul className="navbar-nav mx-auto">
              <li className="nav-item" hidden={this.state.estaLogin}>
                <Link className="nav-link active" to='/PageLogin'>Inciar session</Link>
              </li>
              <li className="nav-item" hidden={!this.state.estaLogin}>
                <Link className="nav-link" onClick={()=>this.cerrarSesion()} to='/'>Cerrar session</Link>
              </li>
              <li className="nav-item" hidden={!this.state.estaLogin}>
                <Link className="nav-link" aria-current="page" to='/PageEventos'>Eventos</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <table className="table" hidden={this.state.estaLogin}>
        <thead>
          <tr>
            <th>Fecha Evento</th>
            <th>Equipo 1</th>
            <th>Equipo 2</th>
            <th>Marcador 1</th>
            <th>Marcador 2</th>
            <th>ID Deporte</th>
            <th>Descripcion Evento</th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.data.map(usuarios => {
              return (
                <tr key={usuarios.eve_id}>
                  <td>{usuarios.eve_fecha}</td>
                  <td>{usuarios.equ_equipo1}</td>
                  <td>{usuarios.equ_equipo2}</td>
                  <td>{usuarios.eve_marca1}</td>
                  <td>{usuarios.eve_marca2}</td>
                  <td>{usuarios.dep_id}</td>
                  <td>{usuarios.eve_descrip}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
    )
  }
}

export default MenuInicio;
import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faL, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Cookies from "universal-cookie";

const url =process.env.REACT_URL_EVENTOS
const cookies = new Cookies();

class MenuAdmin extends Component {
  state = {
    estaLogin: false,
    isad: false,
    data: [],
    form: {
      eve_id: '',
      eve_fecha: '',
      equ_equipo1: '',
      equ_equipo2: '',
      eve_marca1: '',
      eve_marca2: '',
      dep_id: '',
      eve_descrip: '',
      usu_id: ''
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
    if (cookies.get("usu_nombres")) {
      this.setState({ estaLogin: true })
    } else {
      this.setState({ estaLogin: false })
    }
    console.log(cookies.get("usu_rol"))
    if(cookies.get("usu_rol")=='Admin'){
      this.setState({ isad: true})
    }else {
      this.setState({ isad: false})
    }
    this.peticionGet();
  }

  cerrarSesion() {
    cookies.remove("usu_id", { path: "/" })
    cookies.remove("usu_email", { path: "/" })
    cookies.remove("usu_clave", { path: "/" })
    cookies.remove("usu_nomrbes", { path: "/" })
    cookies.remove("usu_apellidos", { path: "/" })
    cookies.remove("usu_rol",{path:"/"})
    this.setState({ estaLogin: false })
  }
  render() {
    return (<nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to='/'>
          <img src='./balones.png' width={60} height={40} alt="" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item" hidden={this.state.estaLogin}>
              <Link className="nav-link active" to='/PageLogin'>Inciar session</Link>
            </li>
            <li className="nav-item" hidden={!this.state.estaLogin}>
              <Link className="nav-link" onClick={() => this.cerrarSesion()} to='/'>Cerrar session</Link>
            </li>
            <li className="nav-item" hidden={!this.state.estaLogin}>
              <Link className="nav-link" aria-current="page" to='/PageEventos'>Eventos</Link>
            </li>
            <li className="nav-item" hidden={!this.state.estaLogin || !this.state.isad}>
              <Link className="nav-link" to='/PageEquipos'>Equipos</Link>
            </li>
            <li className="nav-item" hidden={!this.state.estaLogin || !this.state.isad}>
              <Link className="nav-link" to='/PageDeportes'>Deportes</Link>
            </li>
            <li className="nav-item" hidden={!this.state.estaLogin || !this.state.isad}>
              <Link className="nav-link " to='/PageUsuarios'>Usuarios</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    )
  }
}

export default MenuAdmin
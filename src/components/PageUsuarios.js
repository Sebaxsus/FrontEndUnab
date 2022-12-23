import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
//require('dotenv').config()



const url=process.env.REACT_APP_USUARIOS
const field_id=process.env.REACT_APP_USU_C

class PageUsuarios extends Component{
state={
  data:[],
  modalInsertar:false,
  modalEliminar:false,
  tipoModal:'',
  form:{
    usu_id:'',
    usu_email:'',
    usu_clave:'',
    usu_nombres:'',
    usu_apellidos:'',
    usu_rol:""
  }
}

peticionGet=()=>{
  delete this.state.form.usu_id
  axios.get(url).then(response=>{
    this.setState({data:response.data})
  }).catch(error=>{
    console.log(error.message)
  })
}

peticionPost=async()=>{
  await axios.post(url,this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  }).catch(error=>{
    console.log(error.message)
  })
}


peticionPut=()=>{
  axios.put(url+'/'+field_id+'/'+this.state.form.usu_id, this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  }).catch(error=>{
    console.log(error.message)
  })
}

peticionDelete=()=>{
  axios.delete(url+'/'+field_id+'/'+this.state.form.usu_id, this.state.form).then(response=>{
    this.modalEliminar();
    this.peticionGet();
  }).catch(error=>{
    console.log(error.message)
  })
}

modalInsertar=()=>{
  this.setState({modalInsertar: !this.state.modalInsertar})
}

modalEliminar=()=>{
  this.setState({modalEliminar: !this.state.modalEliminar})
}

handleChange=async e=>{ // Funcion para capturar los datos del usuario. es en 2do plano debe ser asincrona
  e.persist();          // por eso debemos especificar persistencia
  await this.setState({ //await regresa la ejecucion de la funcion asincrona despues de terminar
    form:{
      ...this.state.form,   // esta linea sirve para conservar los datos que ya tenia el arreglo
      [e.target.name]: e.target.value //los nombres de los inputs deben ser iguales a los del arreglo
    }
  });
  console.log(this.state.form); // probar en consola lo que se guarda
}

seleccionarUsuario=(usuario)=>{
  this.setState({
    tipoModal: 'actualizar',
    form: {
      usu_id: usuario.usu_id,
      usu_email: usuario.usu_email,
      usu_clave: usuario.usu_clave,
      usu_nombres: usuario.usu_nombres,
      usu_apellidos: usuario.usu_apellidos,
      usu_rol:usuario.usu_rol
    }
  })
}

componentDidMount(){
  this.peticionGet();
}
render(){

    const form=this.state.form

  return (
    <div className="Usuarios">
      
      <br /><br /><br />
    <button className="btn btn-success" onClick={()=>{this.setState({form:null,tipoModal:'Insertar'});this.modalInsertar()}}>Agregar Usuario</button>
    <br /><br />
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Clave</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
          this.state.data.map(usuarios=>{
            return(
              <tr>
                <td>{usuarios.usu_id}</td>
                <td>{usuarios.usu_email}</td>
                <td>{usuarios.usu_clave}</td>
                <td>{usuarios.usu_nombres}</td>
                <td>{usuarios.usu_apellidos}</td>
                <td>{usuarios.usu_rol}</td>
                <td>
                  <button className='btn btn-primary' onClick={()=>{this.seleccionarUsuario(usuarios);this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button>
                  {"   "}
                  <button className='btn btn-danger' onClick={()=>{this.seleccionarUsuario(usuarios);this.modalEliminar()}}><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon></button>
                </td>
              </tr>
            )
          })
          }
        </tbody>
      </table>

      <Modal isOpen={this.state.modalInsertar}>
        <ModalHeader style={{display:'block'}}>

        </ModalHeader>
        <ModalBody>
          <label htmlFor="usu_email">Email</label>
          <input className="form-control" type="text" name="usu_email" id="usu_email" onChange={this.handleChange} value={form?form.usu_email: ''}></input>
          <br />
          <label htmlFor="usu_clave">Contraseña</label>
          <input className="form-control" type="text" name="usu_clave" id="usu_clave" onChange={this.handleChange} value={form?form.usu_clave: ''}></input>
          <br />
          <label htmlFor="usu_nombres">Nombre</label>
          <input className="form-control" type="text" name="usu_nombres" id="usu_nombres" onChange={this.handleChange} value={form?form.usu_nombres: ''}></input>
          <br />
          <label htmlFor="usu_apellidos">Apellido</label>
          <input className="form-control" type="text" name="usu_apellidos" id="usu_apellidos" onChange={this.handleChange} value={form?form.usu_apellidos: ''}></input>
          <br />
        </ModalBody>
        <ModalFooter>
          {
            this.state.tipoModal=='Insertar'?
            <button className="btn btn-success" onClick={()=>this.peticionPost()}>Insertar</button>
            :<button className="btn btn-success" onClick={()=>this.peticionPut()}>Actualizar</button>
          }
          <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.modalEliminar}>
        <ModalBody>
          Esta segur@ de eliminar este registro?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>{this.peticionDelete()}}>Si</button>
          <button className="btn btn-primary" onClick={()=>{this.modalEliminar()}}>No</button>
        </ModalFooter>
      </Modal>

    </div>
  );
  }
}


export default PageUsuarios

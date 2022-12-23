import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
//require('dotenv').config()

const url= 'https://backend-deportes-production.up.railway.app/api/deportes'
const field_id= 'dep_id'

class PageDeportes extends Component{
    state={
        data:[],
        modalInsertar:false,
        modalEliminar:false,
        tipoModal:'',
        form:{
          dep_id:'',
          dep_nombre:''
        }
      }
      
      peticionGet=()=>{
        delete this.state.form.dep_id
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
        axios.put(url+'/'+field_id+'/'+this.state.form.dep_id, this.state.form).then(response=>{
          this.modalInsertar();
          this.peticionGet();
        }).catch(error=>{
          console.log(error.message)
        })
      }
      
      peticionDelete=()=>{
        axios.delete(url+'/'+field_id+'/'+this.state.form.dep_id, this.state.form).then(response=>{
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
            dep_id: usuario.dep_id,
            dep_nombre: usuario.dep_nombre,
          }
        })
      }
      
      componentDidMount(){
        this.peticionGet();
      }

      render(){

        const form=this.state.form
    
      return (
        <div className="Deportes">
          
          <br /><br /><br />
        <button className="btn btn-success" onClick={()=>{this.setState({form:null,tipoModal:'Insertar'});this.modalInsertar()}}>Agregar Deporte</button>
        <br /><br />
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Deporte</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
              this.state.data.map(usuarios=>{
                return(
                  <tr>
                    <td>{usuarios.dep_id}</td>
                    <td>{usuarios.dep_nombre}</td>
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
              <label htmlFor="dep_nombre">Deporte</label>
              <input className="form-control" type="text" name="dep_nombre" id="dep_nombre" onChange={this.handleChange} value={form?form.dep_nombre: ''}></input>
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

export default PageDeportes
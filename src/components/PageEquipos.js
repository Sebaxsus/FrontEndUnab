require('dotenv').config()
import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url=process.env.REACT_URL_EQUIPOS
const field_id=process.env.EQU_C

class PageEquipos extends Component{
    state={
        data:[],
        modalInsertar:false,
        modalEliminar:false,
        tipoModal:'',
        form:{
            equ_id:'',
            equ_nombre:''
        }
      }
      
      peticionGet=()=>{
        delete this.state.form.equ_id
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
        axios.put(url+'/'+field_id+'/'+this.state.form.equ_id, this.state.form).then(response=>{
          this.modalInsertar();
          this.peticionGet();
        }).catch(error=>{
          console.log(error.message)
        })
      }
      
      peticionDelete=()=>{
        axios.delete(url+'/'+field_id+'/'+this.state.form.equ_id, this.state.form).then(response=>{
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
            equ_id: usuario.equ_id,
            equ_nombre: usuario.equ_nombre,
          }
        })
      }
      
      componentDidMount(){
        this.peticionGet();
      }

      render(){

        const form=this.state.form
    
      return (
        <div className="Equipos">
          
          <br /><br /><br />
        <button className="btn btn-success" onClick={()=>{this.setState({form:null,tipoModal:'Insertar'});this.modalInsertar()}}>Agregar Equipo</button>
        <br /><br />
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Equipo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
              this.state.data.map(usuarios=>{
                return(
                  <tr>
                    <td>{usuarios.equ_id}</td>
                    <td>{usuarios.equ_nombre}</td>
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
              <label htmlFor="equ_nombre">Equipo</label>
              <input className="form-control" type="text" name="equ_nombre" id="equ_nombre" onChange={this.handleChange} value={form?form.equ_nombre: ''}></input>
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

export default PageEquipos
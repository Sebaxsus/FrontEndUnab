import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
//require('dotenv').config()

const url='https://backend-deportes-production.up.railway.app/api/eventos'
const field_id='eve_id'

class PageEventos extends Component{
    state={
        data:[],
        modalInsertar:false,
        modalEliminar:false,
        tipoModal:'',
        form:{
          eve_id:'',
          eve_fecha:'',
          equ_equipo1:'',
          equ_equipo2:'',
          eve_marca1:'',
          eve_marca2:'',
          dep_id:'',
          eve_descrip:''
        }
      }
      
      peticionGet=()=>{
        delete this.state.form.eve_id
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
        axios.put(url+'/'+field_id+'/'+this.state.form.eve_id, this.state.form).then(response=>{
          this.modalInsertar();
          this.peticionGet();
        }).catch(error=>{
          console.log(error.message)
        })
      }
      
      peticionDelete=()=>{
        axios.delete(url+'/'+field_id+'/'+this.state.form.eve_id, this.state.form).then(response=>{
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
            eve_id: usuario.eve_id,
          eve_fecha: usuario.eve_fecha,
          //reg_fecha: usuario.reg_fecha,
          equ_equipo1: usuario.equ_equipo1,
          equ_equipo2: usuario.equ_equipo2,
          eve_marca1: usuario.eve_marca1,
          eve_marca2: usuario.eve_marca2,
          dep_id: usuario.dep_id,
          eve_descrip: usuario.eve_descrip
          //usu_id: usuario.usu_id
          }
        })
      }
      
      componentDidMount(){
        this.peticionGet();
      }
      render(){
      
          const form=this.state.form
      
        return (
          <div className="Eventos">
            
            <br /><br /><br />
          <button className="btn btn-success" onClick={()=>{this.setState({form:null,tipoModal:'Insertar'});this.modalInsertar()}}>Agregar Evento</button>
          <br /><br />
            <table className="table">
              <thead>
                <tr>
                  <th>ID Evento</th>
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
                this.state.data.map(usuarios=>{
                  return(
                    <tr>
                      <td>{usuarios.eve_id}</td>
                      <td>{usuarios.eve_fecha}</td>
                      <td>{usuarios.equ_equipo1}</td>
                      <td>{usuarios.equ_equipo2}</td>
                      <td>{usuarios.eve_marca1}</td>
                      <td>{usuarios.eve_marca2}</td>
                      <td>{usuarios.dep_id}</td>
                      <td>{usuarios.eve_descrip}</td>
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
                <label htmlFor="eve_fecha">Fecha</label>
                <input className="form-control" type="date" name="eve_fecha" id="eve_fecha" onChange={this.handleChange} value={form?form.eve_fecha: ''}></input>
                <br />
                <label htmlFor="equ_equipo1">Equipo 1</label>
                <input className="form-control" type="text" name="equ_equipo1" id="equ_equipo1" onChange={this.handleChange} value={form?form.equ_equipo1: ''}></input>
                <br />
                <label htmlFor="equ_equipo2">Equipo 2</label>
                <input className="form-control" type="text" name="equ_equipo2" id="equ_equipo2" onChange={this.handleChange} value={form?form.equ_equipo2: ''}></input>
                <br />
                <label htmlFor="eve_marca1">Marcador 1</label>
                <input className="form-control" type="text" name="eve_marca1" id="eve_marca1" onChange={this.handleChange} value={form?form.eve_marca1: ''}></input>
                <br />
                <label htmlFor="eve_marca2">Marcador 2</label>
                <input className="form-control" type="text" name="eve_marca2" id="eve_marca2" onChange={this.handleChange} value={form?form.eve_marca2: ''}></input>
                <br />
                <label htmlFor="dep_id">ID Deporte</label>
                <input className="form-control" type="text" name="dep_id" id="dep_id" onChange={this.handleChange} value={form?form.dep_id: ''}></input>
                <br />
                <label htmlFor="eve_descrip">Descripcion Evento</label>
                <input className="form-control" type="text" name="eve_descrip" id="eve_descrip" onChange={this.handleChange} value={form?form.eve_descrip: ''}></input>
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

export default PageEventos
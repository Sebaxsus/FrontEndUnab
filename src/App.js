//import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import Menu from './components/Menu';
import PageInicio from './components/PageIncio';
import PageEventos from './components/PageEventos';
import PageDeportes from './components/PageDeportes';
import PageUsuarios from './components/PageUsuarios';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PageEquipos from './components/PageEquipos';
import MenuAdmin from './components/MenuAdmin';
import { config } from '@fortawesome/fontawesome-svg-core';
import MenuInicio from './components/MenuInicio';
import PageLogin from './components/PageLogin';
import Cookies from "universal-cookie";
//require('dotenv').config()

const cookies = new Cookies();

class App extends Component{
  state = {
    estaLogin: false,
  }
  componentDidMount() {
    if(cookies.get("usu_nombres")){
      this.setState({estaLogin:true})
    }else{
      this.setState({estaLogin:false})
    }
    //this.peticionGet();
  }

  /*validar() {
    if (this.state.estaLogin || cookies.get("usu_rol")) {
      return <MenuAdmin />
    } else if (this.state.estaLogin) {
      return <Menu />
    }else{
      return <MenuInicio />
    }
  }*/
//readonly para deshabilitar un campo
  render(){

    

  return (
    <div className="App">
      <>
        <Router>
            <MenuAdmin />
        <Routes>
          <Route path='/' element={<PageInicio />} />
          <Route path='/PageInicio' element={<PageInicio />} />
          <Route path='/PageDeportes' element={<PageDeportes />} />
          <Route path='/PageEventos' element={<PageEventos />} />
          <Route path='/PageUsuarios' element={<PageUsuarios />} />
          <Route path='/PageEquipos' element={<PageEquipos />} />
          <Route path='/PageLogin' element={<PageLogin />} />
          
          

        </Routes>
        </Router>
      </>
      
    </div>
  );
  }
}

export default App;

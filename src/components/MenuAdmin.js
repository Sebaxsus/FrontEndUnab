import React, { Component } from "react"
import { Link } from "react-router-dom"

function MenuAdmin() {
  return (<nav className="navbar navbar-expand-lg bg-light">
    <div className="container-fluid">
      <Link className="navbar-brand" to='/'>
        <img src="" width={60} alt=""></img>
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link active" to='/PageInicio'>Incio</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/PageEventos'>Eventos</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/PageEquipos'>Equipos</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/PageDeportes'>Deportes</Link>
          </li>
          <li className="nav-item" >
            <Link className="nav-link " to='/PageUsuarios'>Usuarios</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default MenuAdmin
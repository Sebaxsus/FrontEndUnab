import { Link } from "react-router-dom"

function Menu() {
    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to='/'>
                    <img src='./balones.png' width={60} height={40} alt="" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to='/PageInicio'>Incio</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to='/PageEventos'>Eventos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to='/PageEquipos'>Equipos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to='/PageDeportes'>Deportes</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Menu;
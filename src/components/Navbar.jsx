import {Link} from "react-router-dom";

function Navbar () {

    return (
        <nav className="navbar container">
            <div className="menu">
            <Link className="button" to="/">Home</Link>
            <Link className="button-crear" to="/productos">Crear producto</Link>
            </div>

            <div className="login">
            <Link className="button" to="#">Crear cuenta</Link>
            <Link className="button" to="#">Login</Link>
            </div>
        </nav>
    )

};

export default Navbar;
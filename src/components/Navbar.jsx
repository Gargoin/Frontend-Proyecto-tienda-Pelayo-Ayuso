import {Link} from "react-router-dom";

function Navbar () {

    return (
        <nav className="navbar container">
            <div className="menu">
                <Link className="button" to="/">Home</Link>
                <Link className="button-crear" to="/new">Crear producto</Link>
            </div>
            
            <div className="login">
                <Link className="button" to="/register">Crea tu usuario</Link>
                <Link className="button" to="/login">Login</Link>
            </div>
        </nav>
    )

};

export default Navbar;
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Navbar () {
    
    const navigate = useNavigate();
    const {user, logout} = useAuth();
    const handleLogout = () => {
        navigate("/");
            logout();
    };

    return (
        <nav className="navbar container">

            <div className="menu">
                <Link className="button" to="/">Home</Link>
                {user && user.admin && <Link className="button-crear" to="/new">Crear producto</Link>}
            </div>

            {user && 
            <div className="login">
                <div className="user-name">{user.name}</div>
                <Link className="button" onClick={handleLogout}>Logout</Link>
            </div>}
            
            {!user &&
            <div className="login">
                <Link className="button" to="/auth/register">Crea tu usuario</Link>
                <Link className="button" to="/auth/login">Login</Link>
            </div>}
        </nav>
    )

};

export default Navbar;
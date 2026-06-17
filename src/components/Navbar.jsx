import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

function Navbar () {

    const navigate = useNavigate();
    const {user, logout} = useAuth();

    const [openMenu, setOpenMenu] = useState(false);

    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    const closeMenu = () => setOpenMenu(false);

    const handleLogout = () => {
        closeMenu();
        navigate("/");
        logout();
    };


    // CLICK OUTSIDE
    useEffect(() => {

        const handleClickOutside = (e) => {

            if (
                menuRef.current &&
                !menuRef.current.contains(e.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(e.target)
            ) {
                closeMenu();
            }

        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, []);



    return (
        <nav className="navbar container">

            <button ref={buttonRef} className="hamburger" onClick={(e) => { e.stopPropagation(); setOpenMenu(prev => !prev); }} >☰</button>


            <div
                ref={menuRef}
                className={`menu ${openMenu ? "menu-open" : ""}`}
            >

                <Link className="button" to="/" onClick={closeMenu}>
                    Home
                </Link>

                {user && user.admin &&
                    <Link className="button-crear" to="/new" onClick={closeMenu}>
                        Crear producto
                    </Link>
                }

                {!user &&
                    <Link className="button" to="/auth/register" onClick={closeMenu}>
                        Crea tu usuario
                    </Link>
                }

            </div>


            {user &&
                <div className="login">

                    <div className={user?.admin ? "user-name-admin" : "user-name"}>
                        {user.name}
                    </div>

                    <button className="button" onClick={handleLogout}>
                        Logout
                    </button>

                </div>
            }


            {!user &&
                <div className="login">

                    <Link className="button" to="/auth/login">
                        Login
                    </Link>

                </div>
            }

        </nav>
    );
}

export default Navbar;
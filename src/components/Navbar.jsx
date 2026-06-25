import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { getCart } from "../services/cartService";
import { useAuth } from "../hooks/useAuth";

function Navbar () {

    const navigate = useNavigate();
    const {user, logout} = useAuth();

    const [openMenu, setOpenMenu] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    const closeMenu = () => setOpenMenu(false);
    const handleLogout = () => { closeMenu(); navigate("/"); logout(); };


const loadCartCount = async()=>{

    if(!user){
        setCartCount(0);
        return;
    }

    try {

        const cart = await getCart();

        console.log("CART:", cart.items);

        const count = cart.items.length;

        console.log("COUNT:", count);

        setCartCount(count);

    } catch(error) {

        setCartCount(0);

    }

};

useEffect(()=>{

    loadCartCount();

    window.addEventListener("cartUpdated", loadCartCount);

    return ()=>{
        window.removeEventListener("cartUpdated", loadCartCount);
    };

},[user]);


useEffect(() => {

    const handleClickOutside = (e) => {

        if (menuRef.current && !menuRef.current.contains(e.target) && buttonRef.current && !buttonRef.current.contains(e.target)) {

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


        <div ref={menuRef} className={`menu ${openMenu ? "menu-open" : ""}`}>

            <Link className="button" to="/" onClick={closeMenu}>Home</Link>

                {user && user.admin && <Link className="button-crear" to="/new" onClick={closeMenu}> Crear producto </Link>}
                {!user && <Link className="button" to="/auth/register" onClick={closeMenu}> Crea tu usuario </Link> }

        </div>


        {user && <div className="login">

                    <div className="cart-button" onClick={()=>navigate("/cart")}> <ShoppingCartIcon className="cart-icon"/> {cartCount > 0 && ( <span className="cart-count"> {cartCount} </span>)}</div>
                    <div className={user?.admin ? "user-name-admin" : "user-name"}>{user.name}</div>

                    <button className="button logout" onClick={handleLogout}>Logout</button>

        </div>}

            {!user && <div className="login"><Link className="button" to="/auth/login">Login</Link></div>}

        </nav>
    );
}

export default Navbar;
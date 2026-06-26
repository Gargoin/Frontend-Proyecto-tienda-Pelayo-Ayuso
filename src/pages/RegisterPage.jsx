import {useState, useEffect} from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import {register} from "../services/authService";


const initialForm = {
    name: "",
    email: "",
    password: "",
    passwordConfirm: ""
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function RegisterPage() {

    const [form, setForm] = useState(initialForm);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const isDisabled = loading;

    const handleChange = (event) => {
        const {name, value} = event.target;
        setForm({...form, [name]: value,})
    };

    const validateForm = () => {

    if(!form.name.trim()) {
        return "El nombre de usuario es obligatorio";
    }

    if (!form.email.trim()) {
      return "El correo electrónico es obligatorio";
    }

    if (!emailRegex.test(form.email)) {
      return "El correo electrónico no es válido";
    }

    if (!emailRegex.test(form.emailConfirm)) {
      return "El correo electrónico no es válido";
    }

    if (form.emailConfirm != form.email) {
      return "Los correos no coinciden";
    }



    if (!form.password.trim()) {
      return "La contraseña es obligatoria";
    }

    if (form.password != form.passwordConfirm){
        return "Las contraseñas no coinciden";
    }

    return null;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setError("");
            setMessage("");

            const validationError = validateForm();

            if (validationError) {
                setError(validationError);
            return;
            }

        setError(null);
        setLoading(true);

        const userData = {
            name: form.name.trim(),   
            email: form.email.trim(),
            password: form.password
        };

        const data = await register (userData);

        setMessage(data.message || "Usuario registrado correctamente");

        setTimeout(() => {
            navigate("/auth/login");
            setLoading(false);
        }, 2000);
        
        setForm(initialForm);


        } catch (error) {
            setError(error.message);
            
        }
    }


    return (
        <main>
            <section className="auth-section">
                <div className="container">

                    {message && (<div className="mensaje-exito container"><p>{message}</p></div>)}

                    {!message && (

                        <form className="product-form container" onSubmit={handleSubmit}>

                        <h1>Crea tu usuario</h1>
                        
                        <div className="form-group-login">
                            <label htmlFor="name">Nombre: </label>
                            <input className="search-input" placeholder="Nombre de usuario" type="name" name="name" id="name" value={form.name} onChange={handleChange}/>
                        </div>

                        <div className="form-group-login">
                            <label htmlFor="email">Correo: </label>
                            <input className="search-input" placeholder="Email" type="email" name="email" id="email" value={form.email} onChange={handleChange}/>
                        </div>

                        <div className="form-group-login">
                            <label htmlFor="emailConfirm">Confirma tu correo: </label>
                            <input className="search-input" placeholder="Confirma tu correo" type="email" name="emailConfirm" id="emailConfirm" value={form.emailConfirm} onChange={handleChange}/>
                        </div>

                        <div className="form-group-login">
                            <label htmlFor="password">Contraseña: </label>
                            <div className="password-wrapper">
                                <input className="search-input" placeholder="Contraseña" type={showPassword ? "text" : "password"} name="password" id="password" value={form.password} onChange={handleChange}/>
                                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? (<EyeSlashIcon className="icon" />) : (<EyeIcon className="icon" />)} 
                                </button>
                            </div>
                        </div>

                        <div className="form-group-login">
                            <label htmlFor="passwordConfirm">Confirma tu contraseña: </label>
                            <div className="password-wrapper">
                                <input className="search-input" placeholder="Confirma tu contraseña" type={showPasswordConfirm ? "text" : "password"} name="passwordConfirm" id="passwordConfirm" value={form.passwordConfirm} onChange={handleChange}/>
                                <button type="button" onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}>
                                    {showPasswordConfirm ? (<EyeSlashIcon className="icon" />) : (<EyeIcon className="icon" />)} 
                                </button>
                            </div>
                        </div>
                            
                            {error && (<div className="mensaje-alerta"><p>{error}</p></div>)}

                            <button type="submit" className="button" disabled={isDisabled}> {loading ? "Creando usuario..." : "Crear usuario"}</button>

                        </form>
                    )}
                </div>
            </section>
        </main>



    );
}

export default RegisterPage;
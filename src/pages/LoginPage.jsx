import {useState, useEffect} from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { useAuth } from "../hooks/useAuth";


const initialForm = {
    email: "",
    password: ""
  }

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function LoginPage () {
    const context = useAuth();
    const [form, setForm] = useState(initialForm);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const isDisabled = loading;

    const handleChange = (event) => {
        const {name, value} = event.target;
        setForm({...form, [name]: value,})
    };

    const validateForm = () => {

    if (!form.email.trim()) {
      return "El correo electrónico es obligatorio";
    }

    if (!emailRegex.test(form.email)) {
      return "El correo electrónico no es válido";
    }

    if (!form.password.trim()) {
      return "La contraseña es obligatoria";
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
            email: form.email.trim(),
            password: form.password
        };

        const data = await login (userData);

        context.login(data);

        navigate("/");
        
        setForm(initialForm);


        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

  return (
          <main>
      <section className="auth-section">
        <div className="container">
    <form className="product-form container" onSubmit={handleSubmit}>
        <h2>Inicia sesión</h2>
        <div className="form-group-login">
            <label htmlFor="email">Correo: </label>
            <input className="search-input" placeholder="Email" type="email" name="email" id="email" value={form.email} onChange={handleChange}/>
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
        {error && (<div className="mensaje-alerta"><p>{error}</p></div>)}
        <button type="submit" className="button" disabled={isDisabled}> {loading ? "Iniciando sesión" : "Iniciar sesión"}</button>
    </form>
    </div>
</section>
  </main>);


}

export default LoginPage;
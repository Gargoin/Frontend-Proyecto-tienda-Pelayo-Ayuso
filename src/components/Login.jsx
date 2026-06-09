import {useState} from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";


const initialForm = {
    email: "",
    contraseña: ""
  }

function Login () {

    const [form, setForm] = useState(initialForm);

    const handleChange = (event) => {

        const {name, value} = event.target;
        setForm({...form, [name]: value,})
    };

   const [showPassword, setShowPassword] = useState(false);
   const [loading, setLoading] = useState(false);
   const isDisabled = !form.email || !form.password || loading;

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

    if (form.password.trim().length < 6) {
      return "La contraseña debe tener al menos 6 caracteres";
    }

    return null;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationError = validateForm();
    setForm(initialForm);

  }

  return (
      
    <form className="product-form container" onSubmit={handleSubmit}>
        <h2>Login</h2>
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

        <button type="submit" className="button" disabled={isDisabled}> {loading ? "Iniciando sesión" : "Iniciar sesión"}</button>
    </form>

  );


}

export default Login;
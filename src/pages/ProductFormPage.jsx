import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { createProduct, updateProduct, getProductById } from "../services/productService";
import { useAuth } from "../hooks/useAuth";  

const initialForm = {
  nombre: "",
  stock: "",
  precio: "",
  imagen: "",
  imagenDetalle: "",
  descripcion: "",
  categoria: "",
};

function ProductFormPage({}) {
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [form, setForm] = useState(initialForm);

  const { id } = useParams();
 

  const isEdit = Boolean(id);



  useEffect(() => {

    if (!isEdit) {
      setForm(initialForm);
      return;
    }



    const loadProduct = async () => {

      try {

        setLoading(true);
        const data = await getProductById(id);

        setForm({
          nombre: data.nombre,
          stock: data.stock,
          precio: data.precio,
          imagen: data.imagen,
          imagenDetalle: data.imagenDetalle,
          descripcion: data.descripcion,
          categoria: data.categoria,
        });

      } catch (error) {

        setError(error.message || "Error al cargar el producto");

      } finally {

        setLoading(false);

      }
    };

    loadProduct();

  }, [id, isEdit]);

  const handleChange = (event) => {
    const { name, value } = event.target;

     setError("");

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!form.nombre.trim()) {
      return "Ingresa el nombre del producto.";
    }

    if (form.nombre.trim().length < 3) {
      return "El nombre debe tener al menos 3 caracteres"
    }

    if (!form.descripcion.trim()) {
      return "Es necesaria la descripción del producto.";
    }

      if (form.descripcion.trim().length < 30) {
      return "La descripción debe tner al menos 30 caracteres.";
    }

    if (!form.categoria) {
      return "Falta indicar una categoría del producto.";
    }

    if (!form.precio) {
      return "Falta indicar el precio del producto.";
    }

    if (Number(form.precio) < 0) {
      return "El precio no puede ser negativo.";
    }

    if (!form.stock === "") {
      return "Indica el stock del producto.";
    }

    if (Number(form.stock) < 0) {
      return "El stock no puede ser negativo.";
    }

    if (!form.imagen.trim()) {
      return "Es necesaria una URL para la imagen del producto.";
    }

    if (!form.imagenDetalle.trim()) {
      return "Falta la URL para la imagen del detalle del producto.";
    }

    return null;
  };

  const handleSubmit = async (event) => {
  
    event.preventDefault();
    if (saving) return;

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setSaving(true);

    const productData = {
      nombre: form.nombre.trim(),
      precio: Number(form.precio),
      stock: Number(form.stock),
      imagen: form.imagen.trim(),
      imagenDetalle: form.imagenDetalle.trim(),
      descripcion: form.descripcion.trim(),
      categoria: form.categoria.trim(),
    };

    try {

      if (isEdit) {

        await updateProduct(productData, id);

      } else {

        await createProduct(productData);

      } 

      setMessage("Producto guardado correctamente.");

      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (error) {
      console.error(error);

      

      setError(
        error?.message || "Ha ocurrido un error al guardar el producto."
      );

    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <p>Cargando producto...</p>
      </div>
    );
  }

  return (
    <>
      {message && (
        <div className="mensaje-exito container">
          <p>{message}</p>
        </div>
      )}
      {!message && (
      <form className="product-form container" onSubmit={handleSubmit}>
        <h2>
          {isEdit ? `Editando ${form.nombre}` : "Nuevo producto"}
        </h2>

        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input className="search-input" type="text" placeholder="Nombre del producto" id="nombre" name="nombre" value={form.nombre} onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">
            Descripción del producto:
          </label>
          <textarea className="search-input" placeholder="Descripción del producto" id="descripcion" name="descripcion" value={form.descripcion} onChange={handleChange}/>
        </div>

        <div className="form-group-3">
          <div>
            <label htmlFor="categoria">Categoría:</label>
            <select className="search-input" id="categoria" name="categoria" value={form.categoria} onChange={handleChange}>
              <option value="">Selecciona una categoría</option>
              <option value="Camiseta">Camiseta</option>
              <option value="Print">Print</option>
            </select>
          </div>

          <div>
            <label htmlFor="precio">Precio:</label>
            <input className="search-input" type="number" step="0.01" placeholder="Precio del producto" id="precio" name="precio" value={form.precio} onChange={handleChange}/>
          </div>

          <div>
            <label htmlFor="stock">Stock:</label>
            <input className="search-input" type="number" placeholder="Stock del producto" id="stock" name="stock" value={form.stock} onChange={handleChange}/>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="imagen">Imagen:</label>
          <input className="search-input" type="text" placeholder="URL de la imagen del producto" id="imagen" name="imagen" onError={(e) => {e.target.style.display = "none";}} value={form.imagen} onChange={handleChange}/>
        </div>

        {form.imagen.trim() && (
          <div className="imagen-preview">
            <img src={form.imagen} alt="Vista previa" />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="imagenDetalle">Imagen detalle:</label>
          <input className="search-input" type="text" placeholder="URL de la imagen del detalle del producto" id="imagenDetalle" name="imagenDetalle" onError={(e) => {e.target.style.display = "none";}} value={form.imagenDetalle} onChange={handleChange}/>
        </div>

        {form.imagenDetalle.trim() && (
          <div className="imagen-preview">
            <img src={form.imagenDetalle} alt="Vista previa" />
          </div>
        )}

        {error && (
          <div className="mensaje-alerta">
            <p>{error}</p>
          </div>
        )}

        <div className="botonera">
          <button type="submit" className="button-crear" disabled={saving}>{saving ? "Guardando..." : "Guardar producto"}</button>
          <Link className="button-crear" to="/">Cancelar</Link>
        </div>

      </form>)}
    </>
  );
}

export default ProductFormPage;
import {useState, useEffect} from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import { createProduct, updateProduct, getProductById } from "../services/productService";

const initialForm = {
    nombre: "",
    stock: "",
    precio: "",
    imagen: "",
    imagenDetalle: "",
    descripcion: "",
    categoria: "Elige una categoría"
  }

function ProductForm ({onCreateProduct, product, onUpdateProduct}) {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState(initialForm);
  const {id} = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");


  

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
        setError(error.message);
      } finally {
        setLoading(false);
      }

    };

    loadProduct();
  }, [id, isEdit]);



  const handleChange = (event) => {

    const {name, value} = event.target;

    setForm({
      ...form, 
      [name]: value,

    })
  };

  const handleUpdateProduct = async (productId, productData) => {
    const updatedProduct = await updateProduct (productId, productData);

    const updatedProducts = products.map ((product) => {
      if (product._id == productId) {
        return updatedProduct;
      }
      return product;
    });
    
    setProducts(updatedProducts);

  }

  // const handleCreateProduct = async (productData) => {

  // try {

  //   const newProduct = await createProduct(productData);


  // }
    
  // }

  const handleSubmit = (event) => {
    
    const elemento = document.querySelector('.product-form.container');
    event.preventDefault();
    

    if (!form.nombre.trim()){
      alert("Ingresa el nombre del producto.");
      return;
    }

    if (!form.descripcion.trim()){
      alert("Es necesaria la descripción del producto.");
      return;
    }

    if (!form.categoria){
      alert("Falta indicar una categoría del producto.");
      return;
    }

    if (!form.precio){
      alert("Falta indicar el precio del producto.");
      return;
    }

    if (!form.stock){
      alert("Indica el stock del producto.");
      return;
    }

    if (!form.imagen){
      alert("Falta la URL de la imagen del producto.");
      return;
    }

    if (!form.imagenDetalle){
      alert("Falta la URL para la imagen del detalle del producto.");
      return;
    }

     elemento.style.display = 'none';

    setForm(initialForm);

    setMessage("Producto guardado correctamente");
          setTimeout(() => {
        setMessage("");
        navigate("/");
      }, 3000);

  }

  return (
    <>
      {message && <div className="mensaje-exito container"><p>{message}</p></div>}
    <form className="product-form container" onSubmit={handleSubmit}>
      <h2>{isEdit ? `Editando ${form.nombre}` : "Nuevo producto"}</h2>
      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input className="search-input" type="text" placeholder="Nombre del producto" id="nombre" name="nombre" value={form.nombre} onChange={handleChange}></input>
      </div>

      <div className="form-group">
        <label htmlFor="descripcion">Descripción del producto:</label>
        <textarea className="search-input" type="textarea" placeholder="Descripción del producto" id="descripcion" name="descripcion" value={form.descripcion} onChange={handleChange}></textarea>
      </div>
      
      <div className="form-group-3">
      <div>
        <label htmlFor="categoria">Categoria:</label>
        <select className="search-input" id= "categoria" name="categoria" value={form.categoria} onChange={handleChange}>
          <option value="">Selecciona una categoría</option>
          <option value="Camiseta">Camiseta</option>
          <option value="Print">Print</option>
        </select>
      </div>

      <div>
        <label htmlFor="precio">Precio:</label>
        <input className="search-input" type="number" placheolder="Precio del producto" id="precio" name="precio" value={form.precio} onChange={handleChange}></input>
      </div>

      <div>
        <label htmlFor="stock">Stock:</label>
        <input className="search-input" type="number" placheolder="Stock del producto" id="stock" name="stock" value={form.stock} onChange={handleChange}></input>
      </div>
      </div>

      <div className="form-group">
        <label htmlFor="imagen">Imagen:</label>
        <input className="search-input" type="text" placeholder="URL de la imagen del producto" id="imagen" name="imagen" value={form.imagen} onChange={handleChange}></input>
      </div>

      {form.imagen.trim() && (
        <div className="imagen-preview">
          <img src={form.imagen} alt="Vista previa"/>
        </div>
      )}

      <div className="form-group">
        <label htmlFor="imagenDetalle">Nombre:</label>
        <input className="search-input" type="text" placeholder="URL de la imagen del detalle del producto" id="imagenDetalle" name="imagenDetalle" value={form.imagenDetalle} onChange={handleChange}></input>
      </div>

      {form.imagenDetalle.trim() && (
        <div className="imagen-preview">
          <img src={form.imagenDetalle} alt="Vista previa"/>
        </div>
      )}

      {error && <div className="mensaje-alerta"><p>{error}</p></div>}
      

      <div className="botonera">
        <button type="submit" className="button-crear">Guardar producto</button>
        <Link className="button-crear" to="/">Cancelar</Link>
      </div>
    </form>
    </>

  );


}

export default ProductForm;
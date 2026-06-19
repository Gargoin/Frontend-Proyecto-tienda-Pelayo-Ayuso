import {useParams, Link, useNavigate} from "react-router-dom";
import { getProductById, deleteProduct } from "../services/productService";
import {useState, useEffect} from "react";
import { useAuth } from "../hooks/useAuth";  

function ProductDetailPage () {

    const {user} = useAuth();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [imageZoom, setImageZoom] = useState(false);

    const {id} = useParams();
    const navigate = useNavigate();
    
    const [productToDelete, setProductToDelete] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {

        const loadProduct = async () => {

          try {
            
            const data = await getProductById(id);
            setProduct(data);

          } catch (error) {

            setError (error.message);
            
          } finally {

            setLoading(false);

          };

        };

        loadProduct();


    }, [id])



    const handleDelete = async (id) => {
      
      try {
        setSaving(true);

        await deleteProduct(id);
        const elemento = document.querySelector('.container-detalle.container');
        setProductToDelete(null);
        setMessage("Producto eliminado correctamente");
        elemento.style.display = 'none';

      }catch (error) {

        setError(error.message);
      } finally {
        setSaving(false);
      }
     
    }

    useEffect(() => {

      const handleEscape = (event) => {

        if (event.key === "Escape") {
          setImageZoom(false);
        }

      };


    if (imageZoom) {
      document.addEventListener("keydown", handleEscape);
    }


    return () => {
      document.removeEventListener("keydown", handleEscape);
    };

}, [imageZoom]);


    useEffect(() => {
            if (!message) {
            return;
            }

            setTimeout(() => {
                setMessage("");
                navigate("/");
            }, 2000);
        }, [message]);


  if (loading) {
    return (
      <div className="container">
        <p className="cargando">Cargando producto...</p>
      </div>
    );
  }
      

    if (error || !product){
        return(
            <main>
                <section className="detalle-producto">
                    <div className="container-detalle container">
                        <div className="mensaje-no-econtrado">
                        <h2>{error || "Producto no encontrado"}</h2>
                        <Link className="button" to="/">Volver</Link>
                        </div>
                    </div>
                </section> 
            </main>
        )
    }

    return (
  <main>
    <section className="detalle-producto">

          {message && (<div className="mensaje-exito container"><p>{message}</p></div>)}

          <div className="container-detalle container">

            <img src={product.imagenDetalle} alt={product.nombre} className="detalle-image" onClick={() => setImageZoom(true)}/>

              <div className="detalle-producto-content">

                <h1>{product.nombre}</h1>
                <p>{product.precio} €</p>
                <p>{product.descripcion}</p>
                    
                {product.stock < 3 && product.stock !== 0 && <div className="mensaje-alerta"><p>Solo hay {product.stock} en stock!</p></div>}
                {product.stock == 0 && <div className="mensaje-alerta"><p>Actualmente sin existencias.</p></div>}
                    
                <div className="botonera">
                  {user && user.admin &&
                  <div className="botones-admin-detalle">
                    <Link className="button-crear" to={`/edit/${product._id}`}>Editar</Link>
                    <Link className="button-crear"  onClick={() => setProductToDelete(product)}>Borrar</Link>
                  </div>}
                    <Link className="button" to="/">Volver</Link>
                </div>

              </div>

          </div>

          {productToDelete && (
            <div className="modal-overlay" onClick={() => setProductToDelete(null)}>
              <div className="modal" onClick={(event) => event.stopPropagation()}>
                <h2>Eliminar producto</h2>

                <p>
                  ¿Desea eliminar <strong>{productToDelete.nombre}</strong>?
                </p>

                <div className="modal-actions">

                  <button disabled ={saving} className="button-modal secondary" type="button" onClick={() => setProductToDelete(null)}>Cancelar</button>
                  <button disabled={saving} className="button-modal danger" type="button" onClick={() => handleDelete(productToDelete._id)}>{saving ? "Eliminando..." : "Eliminar"}</button>

                </div>
              </div>
            </div>
          )}

          {imageZoom && ( <div className="image-overlay" onClick={() => setImageZoom(false)}>

          <div className="image-overlay-content" onClick={(event) => event.stopPropagation()}>

            <img src={product.imagenDetalle} alt={product.nombre}/>
            <button className="button-modal danger image-close" onClick={() => setImageZoom(false)}> X </button>

          </div>
  </div>
)}
        </section> 
  </main>
  
    );
 }

export default ProductDetailPage;
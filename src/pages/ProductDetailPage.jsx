import { useParams, Link, useNavigate } from "react-router-dom";
import { getProductById, deleteProduct,} from "../services/productService";
import { getCart, updateCartItem, createCartItem,} from "../services/cartService";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

function ProductDetailPage() {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [imageZoom, setImageZoom] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const [quantity, setQuantity] = useState("1");
  const [size, setSize] = useState("");
  const [cartItemId, setCartItemId] = useState(null);

 
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const itemId = params.get("itemId");

    if (!itemId) return;

    const loadCartItem = async () => {
      try {
        const cart = await getCart();

        const item = cart.items.find((i) => i._id === itemId);
        if (!item) return;

        setCartItemId(item._id);
        setQuantity(String(item.cantidad));
        setSize(item.talla || "");
      } catch (err) {
        setError(err.message);
      }
    };

    loadCartItem();
  }, []);

  const needsSize = product?.categoria === "Camiseta";
  const outOfStock = product?.stock === 0;

const validateCart = () => {
  const qtyNumber = Number(quantity);

  if (!quantity || quantity === "") {
    return "Indica la cantidad.";
  }

  if (!Number.isInteger(qtyNumber)) {
    return "La cantidad debe ser un número entero.";
  }

  if (qtyNumber <= 0) {
    return "La cantidad debe ser mayor que 0.";
  }

  return null;
};
  
  const handleCart = async () => {
    
    if (!product) return;

     const validationError = validateCart();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    
    try {
      setSaving(true);

      const payload = { cantidad: Number(quantity), talla: needsSize ? size : undefined,};

      if (cartItemId) {
        await updateCartItem(cartItemId, payload);
        setMessage("Carrito actualizado");
      } else {
        await createCartItem({
          producto: product._id,
          ...payload,
        });
        window.dispatchEvent(new Event("cartUpdated"));
        setMessage("Añadido al carrito");
      }

      setTimeout(() => navigate("/cart"), 600);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  
  const handleDelete = async (productId) => {
    try {
      setSaving(true);
      await deleteProduct(productId);
      setMessage("Producto eliminado correctamente");

      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  
  if (loading) {
    return (
      <div className="container">
        <p className="cargando">Cargando producto...</p>
      </div>
    );
  }

 
  if (!product) {
    return (
      <main>
        <section className="detalle-producto">
          <div className="container-detalle container">
            <div className="mensaje-no-econtrado">
            <h2>Producto no encontrado</h2>
            <Link className="button" to="/">Volver</Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="detalle-producto">

        {message && (
          <div className="mensaje-exito container">
            <p>{message}</p>
          </div>
        )}
        {!message && (
        <div className="container-detalle container">

          <img src={product.imagenDetalle} alt={product.nombre} className="detalle-image" onClick={() => setImageZoom(true)}/>

          <div className="detalle-producto-content">

            <h1>{product.nombre}</h1>
            <p>{product.precio} €</p>
            <p>{product.descripcion}</p>

            {product.stock < 3 && product.stock !== 0 && (
              <div className="mensaje-alerta">
                <p>Solo hay {product.stock} en stock!</p>
              </div>
            )}

            {outOfStock && (
              <div className="mensaje-alerta">
                <p>Producto agotado</p>
              </div>
            )}
           
            {error && (
              <div className="mensaje-alerta">
                <p>{error}</p>
              </div>
            )}

            {(outOfStock || !user) && (
              <div className="botonera solo">
               <Link className="button" to="/">Volver</Link>
              </div>
            )}

            {!outOfStock && user && (
              <>
              <div className="selectores-producto">
                <div className="form-group-selectores">
                  <label>Cantidad</label>
                  <input className="search-input" type="number" min="1" step="1" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                </div>

            {needsSize && (
                  <div className="form-group-selectores talla">
                    <label>Talla</label>
                    <select className="search-input" value={size} onChange={(e) => setSize(e.target.value)}>
                      <option value="">Selecciona talla</option>
                      <option value="XS">XS</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                  </div>
                  
                )}

              </div>

              {user && user.admin &&
                  <div className="botones-admin-detalle">
                    <Link className="button-crear" to={`/edit/${product._id}`}>Editar</Link>
                    <Link className="button-crear"  onClick={() => setProductToDelete(product)}>Borrar</Link>
                  </div>}

                <div className="botonera">
                  {user && (
                    <button className="button" disabled={saving || (needsSize && !size)} onClick={handleCart}>
                      {saving ? "Procesando..." : cartItemId ? "Actualizar carrito" : "Añadir al carrito"}
                    </button>
                  )}

                  <Link className="button" to="/">Volver</Link>
                </div>
              </>
            )}

          </div>
        </div>
        )}
       
        {imageZoom && (
          <div className="image-overlay" onClick={() => setImageZoom(false)}>
            <div className="image-overlay-content" onClick={(e) => e.stopPropagation()}>
              <img src={product.imagenDetalle} alt={product.nombre}/>
              <button className="button-modal danger image-close" onClick={() => setImageZoom(false)}> X </button>
            </div>
          </div>
        )}

        
        {productToDelete && (
          <div className="modal-overlay" onClick={() => setProductToDelete(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>

              <h2>Eliminar producto</h2>
              <p>
                ¿Eliminar <strong>{productToDelete.nombre}</strong>?
              </p>

              <div className="modal-actions">

                <button className="button-modal secondary" onClick={() => setProductToDelete(null)}>Cancelar</button>
                <button className="button-modal danger" disabled={saving} onClick={() => handleDelete(productToDelete._id)}>{saving ? "Eliminando..." : "Eliminar"}</button>

              </div>
            </div>
          </div>
        )}

      </section>
    </main>
  );
}

export default ProductDetailPage;
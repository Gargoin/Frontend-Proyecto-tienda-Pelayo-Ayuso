import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import { getCart, deleteCartItem, clearCart } from "../services/cartService";


function CartPage() {

  const { user } = useAuth();
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);
  const formatPrice = (value) => { return Number(value.toFixed(2)).toString();};

  const [confirmAction, setConfirmAction] = useState(null);


  useEffect(() => {

    if(!user) return;

    const loadCart = async()=>{

      try {

        setLoading(true);

        const data = await getCart();

        setCart(data?.items ? data : {items:[]});


      } catch(error){

        setError(error.message);

      } finally {

        setLoading(false);

      }

    };

    loadCart();

  },[user]);


  const handleDeleteItem = async(itemId)=>{

    try {

      setUpdating(true);

      await deleteCartItem(itemId);

      const updatedCart = await getCart();

      setCart(updatedCart?.items ? updatedCart : {items:[]});

      window.dispatchEvent(new Event("cartUpdated"));

    } catch(error){

      setError(error.message);


    } finally {

      setUpdating(false);

    }

  };


  const handleClearCart = async()=>{

    try {

      setUpdating(true);

      const data = await clearCart();

      setCart(data?.items ? data : {items:[]});

      window.dispatchEvent(new Event("cartUpdated"));

    } catch(error){

      setError(error.message);

    } finally {

      setUpdating(false);

    }

  };


  if(loading){

    return (
      <div className="container">
        <p className="cargando">Cargando carrito...</p>
      </div>
    );

  }


  if(error){

    return (

      <div className="container">
        <p className="mensaje-error">{error}</p>
      </div>

    );

  }


  if(!cart || cart.items.length===0){

    return (

      <main>

        <section className="detalle-producto">

          <div className="container-detalle container">

            <div className="mensaje-no-econtrado">

              <h2>Tu carrito está vacío</h2>

              <button className="button" onClick={()=>navigate("/")}> Seguir comprando</button>

            </div>

          </div>

        </section>

      </main>

    );

  }

  const total = cart.items.reduce((acc,item)=> acc + (item.producto.precio * item.cantidad),0);


  return (

    <main>

      <section className="carrito">

        <div className="container">

          <h1>Tu carrito</h1>

          <div className="carrito-lista">

            {cart.items.map(item=>(

              <div key={item._id} className="carrito-item">

                <div className="carrito-info">

                  <h3>{item.producto.nombre}</h3>

                  <p className={`categoria ${item.producto.categoria}`}>{item.producto.categoria}</p>

                  {item.talla && (<p>Talla: <strong>{item.talla}</strong></p>)}

                  <p>Cantidad: <strong>{item.cantidad}</strong></p>

                  <p>Precio: <strong>{formatPrice(item.producto.precio * item.cantidad)} €</strong></p>

                </div>


                <div className="botonera">
                  <button className="button" onClick={()=>{ navigate(`/productos/${item.producto._id}?itemId=${item._id}`);}}>Editar</button>
                  <button className="button logout" disabled={updating} onClick={(e)=>{ e.stopPropagation(); setConfirmAction({  type:"deleteItem",item});}}>X</button>
                </div>

              </div>

            ))}

          </div>

          <div className="botonera solo">
            <button className="button logout" disabled={updating} onClick={()=>setConfirmAction({ type:"clearCart" })} > Vaciar carrito </button>
          </div>
         
          <div className="carrito-total">
            <h4>Total de tu compra:<strong className="total-verde"> {formatPrice(total)} €</strong></h4><button  className="button" onClick={()=>navigate("/")}>Seguir comprando</button>
          </div>


          {confirmAction && (

            <div className="modal-overlay" onClick={()=>setConfirmAction(null)}>

              <div className="modal" onClick={(e)=>e.stopPropagation()}>

                <h2> {confirmAction.type === "clearCart" ? "Vaciar carrito" : "Eliminar producto"} </h2>

                <p>{confirmAction.type === "clearCart" ? "¿Seguro que quieres vaciar todo el carrito?" : <>¿Eliminar <strong> {" "} {confirmAction.item.producto.nombre} {" "} </strong> del carrito?</>}</p>

                <div className="modal-actions">

                  <button className="button-modal secondary" onClick={()=>setConfirmAction(null)}>Cancelar</button>

                  <button className="button-modal danger" disabled={updating} onClick={async()=>{

                      if(confirmAction.type==="clearCart"){
                        await handleClearCart();
                      } else {
                        await handleDeleteItem(confirmAction.item._id);
                      }
                      setConfirmAction(null);
                    }}>

                    {updating ? "Procesando..." : "Confirmar" }

                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </section>

    </main>

  );

}


export default CartPage;
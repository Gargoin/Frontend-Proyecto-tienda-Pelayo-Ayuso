import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, clearCart } from "../services/cartService";

function OrderPage(){

  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const formatPrice = (value)=>{return Number(value.toFixed(2)).toString();};


  useEffect(()=>{

    const loadOrder = async()=>{

      try {

        const data = await getCart();

        setCart(data?.items ? data : {items:[]});

        try {

          await clearCart();
          window.dispatchEvent(new Event("cartUpdated"))

        } catch(error) {
            setError(error.message);
        }

      } catch (error) {
        setError(error.message);
      
      } finally {
        setLoading(false);
      }
    };

    loadOrder();

  },[]);


  if(loading){

    return (

      <div className="container">
        <p className="cargando">Cargando orden...</p>
      </div>

    );

  }


  if(error){
    return (
      <div className="container">
        <p className="mensaje-error">{error}</p>
      </div>
    );
  };


  if(!cart || cart.items.length === 0){

    return (
      <main>
        <section className="carrito">

          <div className="container orden">

            <h1>Orden de pedido</h1>

            <div className="texto-orden">
              <p><strong>No hay productos en esta orden.</strong></p>
            </div>

            <div className="botonera solo">

              <button className="button" onClick={()=>navigate("/")}>Volver</button>

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

        <div className="container orden">

      
          <h1>Orden de pedido</h1>

        <div className="orden-borde">
          <div className="orden-pedido">

          {cart.items.map(item=>(

          <div key={item._id} className="pedido-item">

            <div className="carrito-info">

              <h3>{item.producto.nombre}</h3>
                <p className={`categoria ${item.producto.categoria}`}>{item.producto.categoria}</p>
                {item.talla && (<p> Talla:{" "}<strong>{item.talla}</strong></p>)}
                <p>Cantidad:{" "}<strong>{item.cantidad}</strong></p>
                <p>Precio:{" "}<strong>{formatPrice(item.producto.precio * item.cantidad)} €</strong></p>

            </div>
          </div>
          ))}
        </div>

        <div className="pedido-total">
          <h4>Total de tu compra:<strong className="total-verde">{" "}{formatPrice(total)} €</strong></h4>
        </div>
        </div>

        <div className="texto-orden">
          <p><strong>Muchas gracias por tu compra.</strong></p>
          <p>Nos ponemos manos a la obra, en breve recibirás un email con la confirmación y los datos de entrega.</p>
        </div>

        <div className="botonera solo">
          <button className="button" onClick={()=>navigate("/")}>Volver</button>
        </div>

      </div>
    </section>
  </main>
);

}



export default OrderPage;
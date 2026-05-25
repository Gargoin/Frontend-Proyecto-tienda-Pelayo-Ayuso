import ProductList from "../components/ProductList"
import{productos} from "../data/productos";

function Home () {

    const productosDestacados = productos.filter(producto => producto.destacado);
    const nuevosProductos = productos.slice(0,3);

    return (
    <main>

        <section className="hero">
            <div className="container">
                <span className="hero-label">Proyecto</span>
                <h1>The Doomgeon Project</h1>
                <p>TEXTO DEL HERO - Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque alias eveniet autem odit tempora. Amet nisi repudiandae id sed quos, dolore natus reprehenderit adipisci aliquam quas laborum et porro illum?</p>
                <a className="button" href="#"><span>Ver productos</span></a>
            </div>
        </section>

        <section className="productos-nuevos">
            <div className="container">
                <h2>Nuevos productos</h2>
                <ProductList productos={nuevosProductos}/>
            </div>
        </section>


        <section className="productos-destacados">
            <div className="container">
                <h2>Contenido destacado</h2>
                <ProductList productos={productosDestacados}/>
            </div>
        </section>
       

    </main>
    )
}

export default Home;
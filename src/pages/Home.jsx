import{productos} from "../data/productos";
import ProductCard from "../components/ProductCard";

function Home () {
    return (
    <main>
        <section className="hero">
            <div className="container">
                <span className="hero-label">Proyecto</span>
                    <h1>The Doomgeon Project</h1>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque alias eveniet autem odit tempora. Amet nisi repudiandae id sed quos, dolore natus reprehenderit adipisci aliquam quas laborum et porro illum?</p>
                    <a className="button" href="#"><span>Ver productos</span></a>
            </div>
        </section>
        <section className="productos-destacados">
            <div className="container">
                <h2>Contenido destacado</h2>
                <div className="lista-productos">
                    {productos.slice(0,3).map(producto => (
                        <ProductCard key={producto.id} producto={producto}/>
                    ))}
                </div>
            </div>

        </section>

    </main>
    )
}

export default Home;
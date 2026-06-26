import {Link} from "react-router-dom";

function NotFoundPage() {
    return (
        <main>
                <section className="detalle-producto">
                    <div className="container-detalle container">
                        <div className="mensaje-no-econtrado">
                            <h2>Página no encontrada</h2>
                            <Link className="button" to="/">Volver</Link>
                        </div>
                    </div>
                </section> 
        </main>
    );
}

export default NotFoundPage;
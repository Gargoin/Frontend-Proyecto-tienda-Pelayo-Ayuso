import {Link} from "react-router-dom";

function NotFoundPage() {
    return (
        <main>
            <section className="">
                <div className="container">
                    <h1>Página no encontrada</h1>
                    <p>La página que estás bsucando no existe.</p>
                    <Link className="button" to="/">Volver</Link>
                </div>
            </section>
        </main>
    );
}

export default NotFoundPage;
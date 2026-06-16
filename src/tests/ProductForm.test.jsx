import {describe, test, expect} from "vitest";
import {render, screen, fireEvent} from  "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import ProductForm from "../components/ProductForm";

describe("", () => {

    test("Espero que muestre el formulario para crear un producto", () => {
        

        render (
            <MemoryRouter>
                <ProductForm />
            </MemoryRouter>
        );
        
        expect(screen.getByText("Categoría:")).toBeInTheDocument();
        expect(screen.getByText("Camiseta")).toBeInTheDocument();
        expect(screen.getByText("Guardar producto")).toBeInTheDocument();
    });

    test("Espero que me permita completar los datos", () => {

        render(
             <MemoryRouter>
                <ProductForm />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText("Precio:"), {
            target: { value: "12"},
        });

        expect(screen.getByDisplayValue("12")).toBeInTheDocument();

    });

    test("Esperar que muestre un formulario para editar un producto", () => {

        const producto = {
            _id: "1",
            nombre:"Producto editado",
            descripcion:"Descripcio del producto a editar",
            imagen:"../src/assets/imgs/600x400-10.png",
            imagenDetalle:"../src/assets/imgs/D10.png",
            precio:"12",
            categoria:"Camiseta",
            stock:"100"
        };

        render(
             <MemoryRouter>
                <ProductForm producto={producto}/>
            </MemoryRouter>
        );
 
        expect(screen.getByDisplayValue("../src/assets/imgs/D10.png")).toBeInTheDocument();


    })
    


});
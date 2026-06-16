import {describe, test, expect} from "vitest";
import {render, screen} from  "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const product = {
    _id: "1",
    nombre: "Nombre del producto",
    descripcion: "Descripcion del producto",
    precio: 12,
    imagen: "../src/assets/imgs/600x400-2.png"
}

describe("ProductCard", () => {

    test("espero que muestre la info del producto", () => {
        
        render(
            <MemoryRouter>
                <ProductCard product={product} />
            </MemoryRouter>
        );

        const image = screen.getByAltText("Nombre del producto");
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", "../src/assets/imgs/600x400-2.png");

        expect(screen.getByText("Nombre del producto")).toBeInTheDocument();
        expect(screen.getByText("Descripcion del producto")).toBeInTheDocument();
        expect(screen.getByText(/12/)).toBeInTheDocument();
        expect(screen.getByAltText("Nombre del producto")).toBeInTheDocument();
    });

});
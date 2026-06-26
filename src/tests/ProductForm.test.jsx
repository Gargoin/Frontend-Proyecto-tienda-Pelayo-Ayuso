import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import ProductForm from "../pages/ProductFormPage";
import { getProductById } from "../services/productService";

vi.mock("../services/productService", () => ({
  createProduct: vi.fn(),
  updateProduct: vi.fn(),
  getProductById: vi.fn(),
}));

describe("ProductForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("Espero que muestre el formulario para crear un producto", () => {
    render(
      <MemoryRouter>
        <ProductForm />
      </MemoryRouter>,
    );

    expect(screen.getByText("Categoría:")).toBeInTheDocument();
    expect(screen.getByText("Camiseta")).toBeInTheDocument();
    expect(screen.getByText("Guardar producto")).toBeInTheDocument();
  });

  test("Espero que me permita completar los datos", () => {
    render(
      <MemoryRouter>
        <ProductForm />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText("Precio:"), {
      target: { value: "12" },
    });

    expect(screen.getByDisplayValue("12")).toBeInTheDocument();
  });

  test("Esperar que muestre un formulario para editar un producto", () => {
    const producto = {
      _id: "1",
      nombre: "Producto editado",
      descripcion: "Descripcio del producto a editar",
      imagen: "../src/assets/imgs/600x400-10.png",
      imagenDetalle: "../src/assets/imgs/D10.png",
      precio: "12",
      categoria: "Camiseta",
      stock: "100",
    };

    getProductById.mockResolvedValue(producto);

    render(
      <MemoryRouter initialEntries={["/productos/editar/1"]}>
        <Routes>
          <Route path="/productos/editar/:id" element={<ProductForm />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(getProductById).toHaveBeenCalledWith("1");

    expect(screen.getByText("Cargando producto...")).toBeInTheDocument();

    return screen
      .findByDisplayValue("../src/assets/imgs/D10.png")
      .then((input) => {
        expect(input).toBeInTheDocument();
        expect(
          screen.getByText("Editando Producto editado"),
        ).toBeInTheDocument();
      });
  });
});


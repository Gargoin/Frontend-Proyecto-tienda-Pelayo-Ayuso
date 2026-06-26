import {describe, test, expect} from "vitest";
import {render, screen} from  "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../components/Navbar";

import {AuthContext} from "../context/AuthContext";

describe("Navbar", () => {
    test("Esepro que muestre el register y el login", () => {
        render(
            <MemoryRouter>
                <AuthContext.Provider value={{ user: null, logout: ()=>{} }}>
                    <Navbar/>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getByText("Login")).toBeInTheDocument();
        expect(screen.getByText("Crea tu usuario")).toBeInTheDocument();
        expect(screen.getByText("Home")).toBeInTheDocument();
    });

    test("Espero que muestre logout", () => {
        const user ={
            name: "Usuario nombre",
            email: "usuario@test.com"
        }

        render(
            <MemoryRouter>
                <AuthContext.Provider value={{ user: user, logout: ()=>{} }}>
                    <Navbar/>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getByText("Logout")).toBeInTheDocument();
        expect(screen.getByText("Usuario nombre")).toBeInTheDocument();
        expect(screen.getByText("Home")).toBeInTheDocument();
        expect(screen.queryByText("Crear producto")).not.toBeInTheDocument();
    })

        test("Espero que muestre Crear producto", () => {
        const user ={
            name: "Usuario nombre",
            email: "usuario@test.com",
            admin: true
        }

        render(
            <MemoryRouter>
                <AuthContext.Provider value={{ user: user, logout: ()=>{} }}>
                    <Navbar/>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getByText("Logout")).toBeInTheDocument();
        expect(screen.getByText("Usuario nombre")).toBeInTheDocument();
        expect(screen.getByText("Home")).toBeInTheDocument();
        expect(screen.getByText("Crear producto")).toBeInTheDocument();
    })
})


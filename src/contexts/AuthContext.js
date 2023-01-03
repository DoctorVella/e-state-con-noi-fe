import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const isAdmin = () => {
        return localStorage.getItem("authLevel") === "ADMIN";
    }

    const isIscrittore = () => {
        return localStorage.getItem("authLevel")  === "ISCRITTORE";
    }

    return <AuthContext.Provider value={{
        isAdmin,
        isIscrittore
    }}>
        {children}
    </AuthContext.Provider>
}
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [bearer,setBearer] = useState();
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [authLevel, setAuthLevel] = useState();

    const isAdmin = () => {
        return authLevel === "ADMIN";
    }

    const isIscrittore = () => {
        return authLevel === "ISCRITTORE";
    }

    return <AuthContext.Provider value={{
        bearer,
        setBearer,
        authLevel,
        setAuthLevel,
        openLoginModal,
        setOpenLoginModal,
        isAdmin,
        isIscrittore
    }}>
        {children}
    </AuthContext.Provider>
}
import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({children}) => {
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openRegisterModal, setOpenRegisterModal] = useState(false);

    return <GlobalContext.Provider value={{
        loading,
        setLoading,
        openLoginModal,
        setOpenLoginModal,
        openRegisterModal,
        setOpenRegisterModal
    }}>
        {children}
    </GlobalContext.Provider>
}
import { createContext, useState } from "react";
import axios from "axios";
import { SESSION_EXPIRED, SESSION_TO_INIT } from "../util/Constants";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({children}) => {
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openRegisterModal, setOpenRegisterModal] = useState(false);
    const [sessionState, setSessionState] = useState(SESSION_TO_INIT);

    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_BE_BASEURL,
        headers: {bearer: localStorage.getItem("bearer")}
    })

    axiosInstance.interceptors.response.use(res => { return res; }, err => {
        const res = err.response;
        if(res.status === 401) {
            setSessionState(SESSION_EXPIRED);
            setOpenLoginModal(true);
        }
        throw err;
    })

    return <GlobalContext.Provider value={{
        loading,
        setLoading,
        axiosInstance,
        sessionState,
        setSessionState,
        openLoginModal,
        setOpenLoginModal,
        openRegisterModal,
        setOpenRegisterModal
    }}>
        {children}
    </GlobalContext.Provider>
}
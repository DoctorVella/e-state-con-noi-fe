import axios from "axios";
import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

const useAuthActions = () => {
    const { setLoading, setOpenClientCallFailedModal } = useContext(GlobalContext);

    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_BE_BASEURL
    });

    axiosInstance.interceptors.response.use(res => { return res; }, err => {
        const res = err.response;
        if(res?.status !== 401) {
            setOpenClientCallFailedModal(true);
        }
        throw err;
    })

    const login = async (data) => {
        try {
            setLoading(true);
            let res = await axiosInstance.put("/login", data);
            localStorage.setItem("bearer",res.data.bearer);
            localStorage.setItem("authLevel",res.data.authLevel);
            setLoading(false);
            return true;
        } catch (e) {
            setLoading(false);
            console.log(e);
            return false;
        }
    };

    const register = async (data) => {
        try {
            setLoading(true);
            let res = await axiosInstance.post("/register", data);
            localStorage.setItem("bearer",res.data.bearer);
            localStorage.setItem("authLevel",res.data.authLevel);
            setLoading(false);
            return true;
        } catch (e) {
            setLoading(false);
            console.log(e);
            return false;
        }
    };

    return {
        login,
        register
    };
}

export default useAuthActions;
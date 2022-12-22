import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { GlobalContext } from "../contexts/GlobalContext";

const useAuthActions = () => {
    const { setBearer, setAuthLevel } = useContext(AuthContext);
    const { setLoading } = useContext(GlobalContext);

    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_BE_BASEURL
    })

    const login = async (data) => {
        try {
            setLoading(true);
            let res = await axiosInstance.put("/login", data);
            setBearer(res.data.bearer);
            setAuthLevel(res.data.authLevel);
            setLoading(false);
            return true;
        } catch (e) {
            setLoading(false);
            return false;
        }
    }

    return {
        login
    };
}

export default useAuthActions;
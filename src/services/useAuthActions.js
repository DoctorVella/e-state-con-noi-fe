import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const useAuthActions = () => {
    const {setBearer, setAuthLevel} = useContext(AuthContext);

    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_BE_BASEURL
    })

    const login = async (data) => {
        let res = await axiosInstance.put("/login",data);
        if(res) {
            setBearer(res.data.bearer);
            setAuthLevel(res.data.authLevel);
        }
    }

    return {
        login
    };
}

export default useAuthActions;
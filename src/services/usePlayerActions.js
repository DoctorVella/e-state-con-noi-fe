import axios from "axios";
import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

const usePlayerActions = () => {
    const { setLoading } = useContext(GlobalContext);

    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_BE_BASEURL,
        headers: {bearer: localStorage.getItem("bearer")}
    })

    const insertPlayer = async (data) => {
        try {
            setLoading(true);
            await axiosInstance.post("/insert-player", data);
            setLoading(false);
            return true;
        } catch (e) {
            setLoading(false);
            console.log(e);
            return false;
        }
    }

    return {
        insertPlayer
    };
}

export default usePlayerActions;
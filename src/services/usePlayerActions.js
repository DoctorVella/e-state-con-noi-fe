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

    const findPlayer = async () => {
        try {
            setLoading(true);
            let res = await axiosInstance.get("/find-player");
            setLoading(false);
            return res.data;
        }catch (e) {
            setLoading(false);
            console.log(e);
            return false;
        }
    }

    return {
        insertPlayer,
        findPlayer
    };
}

export default usePlayerActions;
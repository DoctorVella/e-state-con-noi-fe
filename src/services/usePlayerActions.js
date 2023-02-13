import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

const usePlayerActions = () => {
    const { setLoading, axiosInstance } = useContext(GlobalContext);

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

    const insertPlayerAsAnimatore = async (data) => {
        try {
            setLoading(true);
            await axiosInstance.post("/insert-player-as-animatore", data);
            setLoading(false);
            return true;
        } catch (e) {
            setLoading(false);
            console.log(e);
            return false;
        }
    }

    const findPlayerAsAnimatore = async (_id) => {
        try {
            setLoading(true);
            let res = await axiosInstance.get("/find-player",{params:{_id: _id}});
            setLoading(false);
            return res.data;
        }catch (e) {
            setLoading(false);
            console.log(e);
            return false;
        }
    }

    const updatePlaterAsAnimatore = async (data) => {
        try {
            setLoading(true);
            await axiosInstance.put("/update-player-as-animatore", data);
            setLoading(false);
            return true;
        } catch (e) {
            setLoading(false);
            console.log(e);
            return false;
        }
    }

    return {
        insertPlayer,
        findPlayer,
        insertPlayerAsAnimatore,
        findPlayerAsAnimatore,
        updatePlaterAsAnimatore
    };
}

export default usePlayerActions;
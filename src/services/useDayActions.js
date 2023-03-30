import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

const useDayActions = () => {
    const { setLoading, axiosInstance } = useContext(GlobalContext);

    const findDay = async (day) => {
        try {
            setLoading(true);
            let res = await axiosInstance.get("/day/" + day);
            setLoading(false);
            return res.data;
        }catch (e) {
            setLoading(false);
            console.log(e);
            return false;
        }
    }

    const createUpdateDay = async (day,activities) => {
        let data = {day: day, activities: activities};
        try {
            setLoading(true);
            await axiosInstance.put("/day", data);
            setLoading(false);
            return true;
        } catch (e) {
            setLoading(false);
            console.log(e);
            return false;
        }
    }

    return {
        findDay,
        createUpdateDay
    };
}

export default useDayActions;
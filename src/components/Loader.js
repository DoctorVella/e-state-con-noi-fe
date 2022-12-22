import { Backdrop, CircularProgress, useTheme } from "@mui/material";
import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

const Loader = () => {
    const {loading} = useContext(GlobalContext);

    return <Backdrop open={loading} sx={{ zIndex: useTheme().zIndex.drawer + 1000}}>
        <CircularProgress szie={94}/>
    </Backdrop>
}

export default Loader;
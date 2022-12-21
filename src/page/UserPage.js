import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import AdminPage from "./AdminPage";

const UserPage = () => {
    const navigate = useNavigate();
    const {isAdmin,isIscrittore} = useContext(AuthContext);

    const choosePage = () => {
        if(isIscrittore()) {
            return <UserPage/>;
        }else if(isAdmin()) {
            return <AdminPage/>;
        }else{
            navigate("/");
            return <></>;
        }
    }

    return (<>{choosePage()}</>);
}

export default UserPage;
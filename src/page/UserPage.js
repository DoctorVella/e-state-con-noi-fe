import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import AdminPage from "./AdminPage";

const UserPage = () => {
    const {isAdmin,isIscrittore} = useContext(AuthContext);

    const choosePage = () => {
        if(isIscrittore()) {
            return <UserPage/>;
        }else if(isAdmin()) {
            return <AdminPage/>;
        }else{
            return <></>;
        }
    }

    return (<>{choosePage()}</>);
}

export default UserPage;
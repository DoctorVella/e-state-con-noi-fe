import { AUTH_LEVEL_ADMIN, AUTH_LEVEL_ANIMATORE } from "../util/Constants";
import AdminPage from "./AdminPage";
import AnimatorePage from "./AnimatorePage";
import IscrittorePage from "./IscrittorePage";

const UserPage = () => {

    const getPage = () => {
        let authLevel = localStorage.getItem("authLevel");
        if(authLevel === AUTH_LEVEL_ADMIN) {
            return <AdminPage/>;
        }else if(authLevel === AUTH_LEVEL_ANIMATORE) {
            return <AnimatorePage/>;
        }else{
            return <IscrittorePage/>;
        }
    }

    return (<>
        {getPage()}
    </>);
}

export default UserPage;
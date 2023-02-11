import { AUTH_LEVEL_ADMIN } from "../util/Constants";
import AdminPage from "./AdminPage";
import IscrittorePage from "./IscrittorePage";

const UserPage = () => {

    return (<>
        {localStorage.getItem("authLevel") === AUTH_LEVEL_ADMIN ? <AdminPage/> : <IscrittorePage/>}
    </>);
}

export default UserPage;
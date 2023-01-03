import AdminPage from "./AdminPage";
import IscrittorePage from "./IscrittorePage";

const UserPage = () => {

    return (<>
        {localStorage.getItem("authLevel") === "ADMIN" ? <AdminPage/> : <IscrittorePage/>}
    </>);
}

export default UserPage;
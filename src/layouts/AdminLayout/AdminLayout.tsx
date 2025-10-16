import SideBar from "../../components/layout/sidebar/SideBar";
import { Outlet } from 'react-router';


const AdminLayout = () => {
    return (
        <div>
            <SideBar />
            <Outlet />
        </div>
    );
};

export default AdminLayout;
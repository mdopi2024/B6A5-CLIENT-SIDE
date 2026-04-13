import Profile from "@/components/module/shared/Profile";
import { AuthServices } from "@/services/auth.services";


const AdminPage = async() => {
    const {user} = await AuthServices.session();

    return (
        <div>
            <Profile user={user}></Profile>
        </div>
    );
};

export default AdminPage;
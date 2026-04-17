import AdminRoomUpdateForm from "@/components/module/admin/AdminRoomUpdatedForm";
import UpdateRoomForm from "@/components/module/shared/UpdateRoomForm";


const UpdateRoom = async({params}:{params:Promise<{id:string}>}) => {
    const {id}= await params
    
    return (
        <div>
         <AdminRoomUpdateForm id={id}></AdminRoomUpdateForm>
        </div>
    );
};

export default UpdateRoom;
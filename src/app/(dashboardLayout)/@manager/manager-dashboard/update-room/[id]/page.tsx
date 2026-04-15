import UpdateRoomForm from "@/components/module/shared/UpdateRoomForm";


const UpdateRoom = async({params}:{params:Promise<{id:string}>}) => {
    const {id}= await params
    
    return (
        <div>
          <UpdateRoomForm></UpdateRoomForm>
        </div>
    );
};

export default UpdateRoom;
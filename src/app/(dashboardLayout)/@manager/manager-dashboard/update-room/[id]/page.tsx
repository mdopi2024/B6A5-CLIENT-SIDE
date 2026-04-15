import UpdateRoomForm from "@/components/module/shared/UpdateRoomForm";


const UpdateRoom = async({params}:{params:Promise<{id:string}>}) => {
    const {id}= await params
    
    return (
        <div>
          <UpdateRoomForm id={id}></UpdateRoomForm>
        </div>
    );
};

export default UpdateRoom;
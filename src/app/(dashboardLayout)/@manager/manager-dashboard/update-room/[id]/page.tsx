

const UpdateRoom = async({params}:{params:Promise<{id:string}>}) => {
    const {id}= await params
    
    return (
        <div>
            i am update room {id}
        </div>
    );
};

export default UpdateRoom;
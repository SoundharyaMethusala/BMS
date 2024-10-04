import { message } from "antd";
import { deleteTheatre } from "../../api/theatre";
import {Modal} from "antd"

const DeleteTheatreModal = ({isDeleteModalOpen,selectedTheatre,setIsDeleteModalOpen,setSelectedTheatre,getData})=>{

    const handleOk = async()=>{
        try{
            const theatreId=selectedTheatre._id;
            const response = await deleteTheatre({id:theatreId});
            if(response.success){
                message.success(response.message);
                getData();                
            }
            else{
                setSelectedTheatre(null);
                message.error(response.message);
            }
            setIsDeleteModalOpen(false);
        }
            catch(err){
                setIsDeleteModalOpen(false);
                message.error(err.message);
            }
        }

        const handleCancel = ()=>{
            setSelectedTheatre(null);
            setIsDeleteModalOpen(false);
        }

    return(
        <>
            <Modal title="Delete Theatre" open={isDeleteModalOpen} onOk={handleOk}
            onCancel={handleCancel}>
                <p className="pt-3 fs-18">
                    Are you sure you want to delete this theatre?
                </p>
                <p className="pb-3 fs-18">
                    This action can't be undone and you'll lose this theatre data
                </p>
            </Modal>
        </>
    )
}

export default DeleteTheatreModal;
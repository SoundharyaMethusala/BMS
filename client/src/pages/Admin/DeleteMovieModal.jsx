import { message,Modal } from "antd";
import { deleteMovie } from "../../api/movie";

export const DeleteMovieModal = ({isDeleteModalOpen,setIsDeleteModalOpen,selectedMovie,setSelectedMovie,getData})=>{
    const handleOk = async()=>{
        try{
            const movieId = selectedMovie._id;
            const response = await deleteMovie({id:movieId});
            if(response.success){
                message.success(response.message);
                getData();
                setIsDeleteModalOpen(false);
            }
            else{
                message.error(response.message);
                setSelectedMovie(null);
                setIsDeleteModalOpen(false);
            }
        }
        catch(err){
            setIsDeleteModalOpen(false);
            message.error(err.message);
        }
    }
    const handleCancel = ()=>{
        setIsDeleteModalOpen(false);
        setSelectedMovie(null);
    }
    return(
        <>
            <Modal title="Delete Movie?" open={isDeleteModalOpen} onOk={handleOk}
            onCancel={handleCancel}>
                <p className="pt-3 fs-18">
                    Are you sure you want to delete {selectedMovie.movieName} movie?
                </p>
                <p className="pt-3 fs-18">
                    This action can't be undone and you'll lose the movie data
                </p>
            </Modal>
        </>
    )
}
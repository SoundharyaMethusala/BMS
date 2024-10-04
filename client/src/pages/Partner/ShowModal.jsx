import { message,Button,Input,Form,Row,Col,Select,Modal,Table } from 'antd';
import moment from 'moment'
import { useEffect, useState } from 'react';
import { getAllShowByTheatre, updateShow } from '../../api/show';
import {EditOutlined,ArrowLeftOutlined,DeleteOutlined} from '@ant-design/icons'
import {addShow,deleteShow} from '../../api/show'
import {getAllMovies} from '../../api/movie'

const ShowModal = ({isShowModalOpen,setIsShowModalOpen,selectedTheatre})=>{
    const [view,setView] = useState("table");
    const [movies,setMovies] = useState([]);
    const [selectedMovie,setSelectedMovie] = useState(null);
    const [shows,setShows] = useState(null);
    const [selectedShow,setSelectedShow] = useState(null);

    const getData = async()=>{
        try{
            const movieResponse = await getAllMovies();
            if(movieResponse.success){
                setMovies(movieResponse.data);
            }
            else{
                message.error(movieResponse.message);
            }
            const showResponse = await getAllShowByTheatre({theatreId:selectedTheatre._id});
            if(showResponse.success){
                setShows(showResponse.data);
            }
            else{
                message.error(showResponse.message);
            }
        }
        catch(err){
            message.error(err.message);
        }
    }

    const onFinish = async (values)=>{
        try{
            let response = null;
            if(view === "form"){
                response = await addShow({...values,theatre:selectedTheatre._id});
            }
            else{
                // console.log("values",values);
                // console.log("selected show",selectedShow);
                // console.log("selectedTheatre",selectedTheatre);
                response = await updateShow({...values,
                    id:selectedShow._id,
                    theatre:selectedTheatre._id});
            }
            //console.log(response);
            if(response.success){
                getData();
                message.success(response.message);
                setView("table");
            }
            else{
                message.error(response.message);
            }
        }
        catch(err){
            message.error(err.message);
        }
    }

    const handleCancel = ()=>{
        setIsShowModalOpen(false);
    }

    const handleDelete = async (showId)=>{
        try{
            const response = await deleteShow({id:showId});
            if(response.success){
                message.success(response.message);
                getData();
            }
            else{
                message.error(response.message);
            }
        }
        catch(err){
            message.error(err.message);
        }
    }

    const columns = [
        {  
            title:"Show Name",
            dataIndex:"name",
            key:"name"
        },
        {
            title:"Show Date",
            dataIndex:"date",
            render:(text,data)=>{
            return moment(text).format("MMM Do YYYY");
            }
        },
        {
            title:"Show Time",
            dataIndex:"time",
            render:(text,data)=>{
                return moment(text,"HH:mm").format("hh:mm A");
            }
        },
        {
            title:"Movie",
            dataIndex:"movie",
            render:(text,data)=>{
                return data.movie.movieName;
            }
        },
        {
            title:"Ticket Price",
            dataIndex:"ticketPrice",
            key:"ticketPrice"
        },
        {
            title:"Total Seats",
            dataIndex:"totalSeats",
            key:"totalSeats"
        },
        {
            title:"Available Seats",
            dataIndex:"seats",
            render:(text,data)=>{
                return data.totalSeats-data.bookedSeats.length;
            }
        },
        {
            title:"Action",
            dataIndex:"action",
            render:(text,data)=>{
                return(
                    <div className="d-flex align-items-center gap-10">
                        <Button onClick={()=>{
                            setView("edit");
                            setSelectedMovie(data.movie);
                            setSelectedShow({...data,
                                date:moment(data.date).format("YYYY-MM-DD")
                            })
                        }}>
                            <EditOutlined/>
                        </Button>
                        <Button onClick={()=>handleDelete(data._id)}>
                            <DeleteOutlined/>
                        </Button>
                        {
                            data.isActive && 
                                <Button onClick={()=>{
                                    setIsShowModalOpen(true);
                                }}>+Shows</Button>
                        }
                    </div>
                )
            }
        }
    ]

    useEffect(()=>{
        getData();
    },[]);

    console.log(selectedMovie);

    return(
        <>
            <Modal centered title={selectedTheatre.name} open={isShowModalOpen} onCancel={handleCancel}
             width={1200} footer={null}>
                <div className="d-flex justify-content-between">
                    <h3>
                        {view==="table" ? "List of Shows" : view==="form" ? "Add Show" : "Edit Show"}
                    </h3>
                    {
                        view==="table" && (
                            <Button type="primary" onClick={()=>{
                                setView("form")
                            }}>Add Show</Button>
                        )
                    }
                </div>
               {
                view==="table" && <Table dataSource={shows} columns={columns}/>
               }
               {(view==="form" || view==="edit") && (
                <Form className="" layout="vertical" style={{width:"100%"}} initialValues={
                    view==="edit" ? selectedShow : null
                } onFinish={onFinish}>
                    <Row gutter={{xs:6,sm:10,md:12,lg:18}}>
                        <Col span={24}>
                            <Row gutter={{xs:6,sm:10,md:12,lg:16}}>
                                <Col span={8}>
                                    <Form.Item label="Show Name" htmlFor="name" name="name" className="d-block"
                                    rules={[{required:true,message:"Show name is required"}]}>
                                        <Input id="name" type="text" placeholder="Enter the Show Name"/>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Show Date" htmlFor="date" name="date" className="d-block"
                                    rules={[{required:true,message:"Show Date is required"}]}>
                                        <Input id="date" type="date" placeholder="Enter the Show date"/>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                  <Form.Item
                    label="Show Timing"
                    htmlFor="time"
                    name="time"
                    className="d-block"
                    rules={[
                      { required: true, message: "Show time is required!" },
                    ]}
                  >
                    <Input
                      id="time"
                      type="time"
                      placeholder="Enter the show date"
                    ></Input>
                  </Form.Item>
                  </Col>
                            </Row>
                        </Col>
                        <Col Span={24}>
                            <Row gutter={{xs:6,sm:10,md:12,lg:16}}>
                                <Col span={8}>
                                    <Form.Item label="Select the Movie" htmlFor="movie" name="movie"
                                     className="d-block" rules={[{required:true,message:"Movie is required"}]}>
                                       
                                        <Select id="movie" placeholder="Select Movie" 
                                        defaultValue={selectedMovie && selectedMovie.movieName}
                                         style={{width:"100%",height:"45px"}}
                                        options = {movies.map((movie)=>({
                                                key:movie._id,
                                                value:movie._id,
                                                label:movie.movieName
                                        }))}/>
                                     </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Ticket Price" htmlFor="ticketPrice" name="ticketPrice"
                                    className="d-block" rules={[{required:true,message:"Ticket price is required"}]}>
                                        <Input id="ticketPrice" type="number" placeholder="Enter the ticket Price"/>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Total Seats" htmlFor="totalSeats" name="totalSeats" 
                                     className="d-block" rules={[{required:true,message:"Total seats required"}]}>
                                        <Input id="totalSeats" type="number" placeholder="Enter the number of seats"/>
                                     </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <div className="d-flex gap-10">
                        <Button block onClick={()=>{
                            setView("table");
                        }} htmlType="button">
                            <ArrowLeftOutlined/> Go back
                        </Button>
                        <Button block type="primary" htmlType="submit" style={{fontSize:"1rem",fontWeight:"600"}}>
                            {
                                view==="form" ? "Add the Show" : "Edit the Show"
                            }
                        </Button>
                    </div>
                </Form>
               )}

             </Modal>
        </>
    )
}

export default ShowModal;
import { useState,useEffect } from "react";
import { Table,Button,message } from "antd";
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'
import TheatreFormModal  from "./TheatreFormModal";
import { getAllTheatreByOwner } from "../../api/theatre";
import { useSelector } from "react-redux";
import DeleteTheatreModal from './DeleteTheatreModal'
import ShowModal from './ShowModal'


const TheatreList = ()=>{
    const {user} = useSelector((state)=>state.user);
    const [isModalOpen,setIsModalOpen] = useState(false);
    const [isShowModalOpen,setIsShowModalOpen] = useState(false);
    const [isDeleteModalOpen,setIsDeleteModalOpen] = useState(false);
    const [selectedTheatre,setSelectedTheatre] = useState(null);
    const [formType,setFormType] = useState('add');
    const [allTheatres,setAllTheatres] = useState(null);

    const getData = async()=>{
        try{
            const response = await getAllTheatreByOwner({id:user?._id});
            if(response.success){
                const allTheatres=response.data;
                //console.log(response.data);
                setAllTheatres(allTheatres);
            }
            else{
                message.error(response.message);
            }
        }
        catch(err){
            message.error(err.message);
        }
    }

    useEffect(()=>{
        getData();
    },[])

    const columns=[
        {title:'Name',dataIndex:'name',key:'name'},
        {title:'Address',dataIndex:'address',key:'address'},
        {title:'Phone Number',dataIndex:'phone',key:'phone'},
        {title:'Email',dataIndex:'email',key:'email'},
        {title:'Status',dataIndex:'status',render:(status,data)=>{
            if(data.isActive){
                return 'Approved';
            }
            else{
                return 'Pending/Blocked'
            }
        }},
        {title:'Action',dataIndex:'action',render:(text,data)=>{
            return(
                <div className="d-flex align-items-center gap-18">
                    <Button onClick={()=>{
                        setIsModalOpen(true);
                        setFormType('edit');
                        setSelectedTheatre(data);
                    }}>
                        <EditOutlined/>
                    </Button>
                    <Button onClick={
                        ()=>{
                            setIsDeleteModalOpen(true);
                            setSelectedTheatre(data);
                        }
                    }>
                        <DeleteOutlined/>
                    </Button>
                    {
                        data.isActive && <Button onClick={()=>{
                            setIsShowModalOpen(true);
                            setSelectedTheatre(data);
                        }}>
                            +Shows
                        </Button>
                    }
                </div>
            )
        }}
    ]


 return(
    <>
        <div className='d-flex justify-content-end'>
            <Button type="primary" onClick={()=>{
                setIsModalOpen(true);
                setFormType("add");
            }}>Add Theatre</Button>
        </div>
        <Table dataSource={allTheatres} columns={columns}/>
        {
        isModalOpen && <TheatreFormModal isModalOpen={isModalOpen} selectedTheatre={selectedTheatre}
            setSelectedTheatre={setSelectedTheatre} setIsModalOpen={setIsModalOpen} formType={formType}
            getData={getData}/>
        }
        {
            isDeleteModalOpen && <DeleteTheatreModal isDeleteModalOpen={isDeleteModalOpen}
            selectedTheatre={selectedTheatre} setIsDeleteModalOpen={setIsDeleteModalOpen}
            setSelectedTheatre={setSelectedTheatre} getData={getData}/>
        }
        {
            isShowModalOpen && <ShowModal isShowModalOpen={isShowModalOpen} 
            setIsShowModalOpen={setIsShowModalOpen} selectedTheatre={selectedTheatre}/>
        }
    </>
 )
}

export default TheatreList;
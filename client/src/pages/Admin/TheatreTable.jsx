import { useEffect, useState } from "react"
import { getAllTheatres, updateTheatre } from "../../api/theatre";
import { message,Button,Table } from "antd";

export function TheatreTable(){
    const [allTheatres,setAllTheatres] = useState([]);

    const getData = async()=>{
        try{
            const response = await getAllTheatres();
            console.log("response.data",response.data);
            if(response.success){
                const allTheatres=response.data;
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

    const handleStateChange = async (theatre)=>{
        try{
            console.log(theatre);
            const values={...theatre,theatreId:theatre._id,isActive:!theatre.isActive}
            const response = await updateTheatre(values);
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
        {title:'Name',dataIndex:'name',key:'name'},
        {title:'Address',dataIndex:'address',key:'address'},
        {title:"Owner",dataIndex:'owner',key:'owner'},
        {title:"Phone Number",dataIndex:'phone',key:'phone'},
        {title:"Email",dataIndex:"email",key:"email"},
        {title:"Status",dataIndex:"status",render:(status,data)=>{
            if(data.isActive){
                return "Approved"
            }
            else{
                return "Pending/Blocked"
            }
        }},
        {title:"Action",dataIndex:"action",render:(text,data)=>{
            return(
                <div className="d-flex align-items-center gap-18">
                    {data.isActive ? <Button onClick={()=>handleStateChange(data)}>Block</Button>
                     : <Button onClick={()=>handleStateChange(data)}>Approve</Button>}
                </div>
            )
        }}
    ]

    return(
        <>
            {allTheatres && allTheatres.length > 0 && (
        <Table dataSource={allTheatres} columns={columns} />
      )}
        </>
    )
}
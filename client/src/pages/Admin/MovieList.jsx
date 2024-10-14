import { Button,Table } from "antd"
import { useState } from "react"
import { getAllMovies } from "../../api/movie";
import { useEffect } from "react";
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import MovieForm from "./MovieForm";
import { DeleteMovieModal } from "./DeleteMovieModal";
import moment from "moment";

export function MovieList(){
    const [movies,setMovies] = useState([]);
    const [isModalOpen,setIsModalOpen]=useState(false);
    const [isDeleteModalOpen,setIsDeleteModalOpen]=useState(false);
    const [formType,setFormType] = useState(null);
    const [selectedMovie,setSelectedMovie]=useState(null);

    const getData = async()=>{
        try{
            const response = await getAllMovies();
            const allMovies=response.data;
            setMovies(allMovies);
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getData();
    },[])

    if(movies.length===0){
        return <h1>No movies found!!</h1>
    }

    const tableHeadings=[
        {
            title:'Poster',
            dataIndex:"poster",
            render:(text,data)=>{
               // console.log(data.poster);
                return <img width="75" height="115" style={{objectFit:"cover"}} src={data.poster} alt="poster"/>
            }
        },
        {title:"Movie Name",dataIndex:"movieName"},
        {title:"Description",dataIndex:"description"},
        {
            title:"Duration",
            dataIndex:"duration",
            render:(text)=>{
                return `${text} Min`
            }
        },
        {title:"Genre",dataIndex:"genre"},
        {title:"Language",dataIndex:"language"},
        {
            title:"Release Date",
            dataIndex:"releaseDate",
            render:(text,data)=>{
                return moment(data.releaseDate).format("MM-DD-YYYY");
            }
        },
        {
            title:"Action",
            render:(text,data)=>{
                return(
                    <div>
                        <Button onClick={()=> {
                            setIsModalOpen(true);
                            setSelectedMovie(data);
                            setFormType("edit")
                        }}>
                        <EditOutlined/>
                        </Button>
                        <Button onClick={
                            ()=>{
                                setIsDeleteModalOpen(true);
                                setSelectedMovie(data);
                            }
                        }>
                            <DeleteOutlined/>
                        </Button>
                    </div>
                )
            }
        }
    ]

    // const movies=[
    //     {
    //         key:"1",
    //         poster:"Image1",
    //         name:"Mastancy",
    //         description:"set in 1739",
    //         duration:120,
    //         genre:"Action",
    //         language:"Hindi",
    //         releaseDate:"Oct 25, 2023"
    //     },
    //     {
    //         key:"2",
    //         poster:"Image2",
    //         name:"Mastancy",
    //         description:"set in 1739",
    //         duration:120,
    //         genre:"Action",
    //         language:"Hindi",
    //         releaseDate:"Oct 25, 2023",
    //         action:"Delete"
    //     },
    // ]

    return(
        <>
            <div className="d-flex justify-content-end">
                <Button onClick={()=>{
                    setIsModalOpen(true);
                    setFormType("add");
                }}>Add Movie</Button>
                <Table columns={tableHeadings} dataSource={movies}/>
                {isModalOpen && 
                    <MovieForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
                    selectedMovie={selectedMovie} formType={formType}
                    setSelectedMovie={setSelectedMovie} getData={getData}/>
                }
                {
                    isDeleteModalOpen && 
                    <DeleteMovieModal isDeleteModalOpen={isDeleteModalOpen} selectedMovie={selectedMovie}
                    setIsDeleteModalOpen={setIsDeleteModalOpen} setSelectedMovie={setSelectedMovie}
                    getData={getData}/>
                }
            </div>
        </>
    )
}
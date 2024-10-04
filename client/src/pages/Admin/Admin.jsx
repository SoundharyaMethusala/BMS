import { TheatreTable } from "./TheatreTable"
import { MovieList } from "./MovieList"
import { Tabs } from "antd"


export function Admin(){

    const tabItems=[
        {
            key:'1',
            label:"Movies",
            children:<MovieList/>
        },
        {
            key:'2',
            label:"Theatres",
            children:<TheatreTable/>
        }
    ]

    return (
        <>
            <div>
                <h1>Welcome to Admin Panel!!</h1>
                <Tabs defaultActiveKey="1" items={tabItems}/>
            </div>
        </>
    )
}
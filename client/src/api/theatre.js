import {createAxiosInstance} from '.'

const BASE_URL = "http://localhost:8080/api/theatres"

export const addTheatre = async (values)=>{
    try{
        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.post(`${BASE_URL}/add`,values);
        return response.data
    }
    catch(err){
        console.log(err);
    }
}

export const updateTheatre = async (values)=>{
    try{
        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.put(`${BASE_URL}/update`,values);
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}

export const getAllTheatres = async ()=>{
    try{
        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.get(`${BASE_URL}/get-all`);
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}

export const getAllTheatreByOwner = async (values)=>{
    try{
        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.post(`${BASE_URL}/get-all-theatre-by-owner`,values);
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}


export const deleteTheatre = async (values)=>{
    try{
        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.post(`${BASE_URL}/delete`,values);
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}
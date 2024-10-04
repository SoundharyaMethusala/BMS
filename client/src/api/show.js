import { createAxiosInstance } from ".";

const BASE_URL = "http://localhost:8080/api/show"

export const getAllShow = async(values)=>{
    try{
        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.get(`${BASE_URL}/get-all`);
        return response.data
    }
    catch(err){
        console.log(err);
    }
}

export const addShow = async (values)=>{
    try{
        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.post(`${BASE_URL}/add`,values);
        return response.data
    }
    catch(err){
        console.log(err);
    }
}

export const updateShow = async (values)=>{
    try{
        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.put(`${BASE_URL}/update`,values);
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}

export const deleteShow = async (values)=>{
    try{
        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.post(`${BASE_URL}/delete`,values);
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}

export const getShowById = async (values)=>{
    try{
        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.post(`${BASE_URL}/get-show-by-id`,values);
        return response.data;
    }   
    catch(err){
        console.log(err);
    }
}
 
export const getAllShowByTheatre = async(values)=>{
    try{
        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.post(`${BASE_URL}/get-all-show-by-theatre`,values);
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}

export const getAllTheatreByMovie = async(values)=>{
    try{
        const axiosInstance=createAxiosInstance();
        const response = await axiosInstance.post(`${BASE_URL}/get-all-theatre-by-movie`,values);
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}
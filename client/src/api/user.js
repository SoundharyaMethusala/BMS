import {createAxiosInstance} from './index'

const BASE_URL = "http://localhost:8080/api/users";


export const RegisterUser = async (values) => {
    try {
        const axiosInstance = createAxiosInstance(); // Create a new instance with the latest token
        const response = await axiosInstance.post(`${BASE_URL}/register`, values);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const LoginUser = async (values) => {
    try {
        const axiosInstance = createAxiosInstance(); // Create a new instance with the latest token
        const response = await axiosInstance.post(`${BASE_URL}/login`, values);
        console.log(values);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const GetCurrentUser = async () => {
    try {
        const axiosInstance = createAxiosInstance(); // Create a new instance with the latest token
        const response = await axiosInstance.get(`${BASE_URL}/get-current-user`);
        //console.log("GetCurrentUser response.data", response.data);
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

export const resetPassword = async (values)=>{
    try{
        const axiosInstance=createAxiosInstance();
        console.log("values",values);
        const response = await axiosInstance.patch(`${BASE_URL}/reset-password`,values);
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}

export const forgotPassword = async (values)=>{
    try{
        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.patch(`${BASE_URL}/forgot-password`,values);
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}
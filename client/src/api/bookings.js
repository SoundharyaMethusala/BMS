import { createAxiosInstance } from ".";

const BASE_URL = "http://localhost:8080/api/booking"

const axiosInstance = createAxiosInstance();

export const makePayment = async (token,amount)=>{
    try{
        const response = await axiosInstance.post(`${BASE_URL}/make-payment`,{token,amount});
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}

export const bookShow = async (values)=>{
    try{
        const response = await axiosInstance.post(`${BASE_URL}/book-show`,values);
      //  console.log("response",response);
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}

export const getallBookingByUser = async ()=>{
    try{
        const response = await axiosInstance.get(`${BASE_URL}/all-booking-by-user`);
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}
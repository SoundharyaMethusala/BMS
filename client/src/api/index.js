import axios from 'axios'

export const createAxiosInstance = () => {
    const token = localStorage.getItem('token');
  //  console.log("index.js - Current token:", token); // Log the token to verify
    return axios.create({
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token || ''}`
        }
    });
};
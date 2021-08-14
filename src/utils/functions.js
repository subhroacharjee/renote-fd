import api from "./api";
import axios from "axios";

export function createHeaderObject () {
    return { 
        headers: {
            authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
    }
}

export async function Login(email,password) {
    const formData = {
        email: email,
        password: password
    };
    
    try {
        const {data} = await axios.post(api.login,formData);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
    
}

export async function Register(email,password) {
    const formData = {
        email: email,
        password: password
    };
    
    try {
        const {data} = await axios.post(api.register,formData);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
    
}

export async function getUser () {
    const config = createHeaderObject();
    try {
        const {data} = await axios.get(api.user,config);
        return data
    } catch (err) {
        console.log(err);
        return null;
    }
}
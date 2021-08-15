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

export async function getNotes () {
    var data = [];
    const config = createHeaderObject();
    try {
        var payload = await axios.get(api.notes,config);
        if (payload.data.body) data = payload.data.body.notes; 
    } catch (error) {
        console.log(error);
    }
    return data;
}

export async function getNote (id) {
    const config = createHeaderObject();

    try {
        const {data} = await axios.get(`${api.notes}/${id}`,config);
        if (data.body) return data.body.notes;
    } catch (error) {
        console.log(error);
    }
    return null;
}

export async function addNote (title, body) {
    const config = createHeaderObject();
    const note = {
        title,
        body
    };

    try {
        const {data} = await axios.post(api.notes, note, config);
        if (data.body) return data.body.note;
        else return {
            error:data.body.error
        }
    } catch (error) {
        console.log(error);
    }
    return null;
}

export async function updateNote (id, title, body) {
    const config = createHeaderObject();
    const note = {
        title,
        body
    };

    try {
        const {data} = await axios.put(`${api.notes}/${id}`, note, config);
        if (data.body) return data.body.notes;
    } catch (error) {
        console.log(error);
    }
    return null;
}

export async function deleteNote (id) {
    const config = createHeaderObject();

    try {
        const {data} = await axios.delete(`${api.notes}/${id}`,config);
        if (data.body) return data.body.notes;
    } catch (error) {
        console.log(error);
    }
    return null;
}
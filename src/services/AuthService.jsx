import axios from "axios"
import { BASE_URL } from "./CONSTANTS"

export const postLogin = (email, password) => {
    return new Promise((resolve, reject) => {
        axios.post(BASE_URL + "/api/login", { email, password })
            .then((response) => {
                console.log(response);
                const { token, refresh } = response.data;
                localStorage.setItem("token", token);  // Guardar el token correctamente
                localStorage.setItem("refresh", refresh);
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

export const getAutenticatedUser = (token) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/api/user/logueado", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log(response);
                //localStorage.setItem("rol", response.data.rol);
                
                console.log(response.data.rol);
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}




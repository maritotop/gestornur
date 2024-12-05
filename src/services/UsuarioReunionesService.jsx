import axios from "axios"
import { BASE_URL } from "./CONSTANTS"

export const getListaUsuarioReuniones = (token) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/apiejemplo/usuario_reuniones", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
        })
            .then((response) => {
                console.log(response);
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}
export const getListaUsuarioReunionesSecond = (token,id) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/apiejemplo/usuario_reuniones2?id="+id, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
        })
            .then((response) => {
                console.log(response);
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}
export const postSaveUsuarioReunion = (token, usuario_reuniones) => {
    return new Promise((resolve, reject) => {
        axios.post(BASE_URL + "/apiejemplo/usuario_reuniones/", usuario_reuniones, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
        })
            .then((response) => {
                console.log(response);
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}
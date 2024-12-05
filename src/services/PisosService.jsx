import axios from "axios"
import { BASE_URL } from "./CONSTANTS"

export const getListaPisos = () => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/webapi/piso/", {
            headers: {
                "Content-Type": "application/json",
                
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

export const postSavePiso = (piso) => {
    return new Promise((resolve, reject) => {
        axios.post(BASE_URL + "/webapi/piso/", piso, {
            headers: {
                "Content-Type": "application/json",
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


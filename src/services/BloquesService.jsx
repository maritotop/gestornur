import axios from "axios"
import { BASE_URL } from "./CONSTANTS"

export const getListaBloques = () => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/webapi/tipo_division_bloque/", {
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


export const postSaveBloque = (bloque) => {
    return new Promise((resolve, reject) => {
        axios.post(BASE_URL + "/webapi/tipo_division_bloque/", bloque, {
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

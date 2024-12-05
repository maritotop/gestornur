import axios from "axios"
import { BASE_URL } from "./CONSTANTS"

export const getListaReuniones = (token) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/apiejemplo/reuniones", {
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

export const postSaveReunion = (token, reunion) => {
    return new Promise((resolve, reject) => {
        axios.post(BASE_URL + "/apiejemplo/reuniones/", reunion, {
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
export const deleteReunion = (token, id) => {
    return new Promise((resolve, reject) => {
      axios.delete(`${BASE_URL}/apiejemplo/reuniones/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        }
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
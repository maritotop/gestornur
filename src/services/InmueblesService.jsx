import axios from "axios";
import { BASE_URL } from "./CONSTANTS";

export const getListaInmuebles = () => {
    return new Promise((resolve, reject) => {
        axios
        .get(BASE_URL + "/webapi/inmuebles/", {
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
    };

    export const postSaveInmueble = (inmueble) => {
        return new Promise((resolve, reject) => {
            axios
            .post(BASE_URL + "/webapi/inmuebles/", inmueble, {
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

    export const patchUpdateInmueble = (id, inmueble) => {
        return new Promise((resolve, reject) => {
            axios
            .patch(`${BASE_URL}/webapi/inmuebles/${id}/`, inmueble, {
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
//haz el metodo para cambiar el estado_construccion del inmueble
export const patchUpdateEstadoConstruccion = (id, inmueble) => {
    return new Promise((resolve, reject) => {
        axios
        .patch(`${BASE_URL}/webapi/inmuebles/${id}/`, inmueble, {
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
    


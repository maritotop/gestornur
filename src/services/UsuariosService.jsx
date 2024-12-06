import axios from "axios";
import { BASE_URL } from "./CONSTANTS";

export const postSaveUser = (token, userData) => {
    return new Promise((resolve, reject) => {
        axios.post(BASE_URL + "/api/users", userData, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
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
};
export const getListaUsuarios = (token) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/api/users", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response);
            resolve(response.data); // Responde con los datos de la respuesta
        })
        .catch((error) => {
            console.log(error);
            reject(error); // Si hay un error, lo rechaza
        });
    });
};
// Obtener un usuario por ID
export const getUsuarioById = (token, id) => {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/api/users/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
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
};
// Actualizar usuario
export const updateUsuario = (token, id, userData) => {
    return new Promise((resolve, reject) => {
        axios.put(`${BASE_URL}/api/users/${id}`, userData, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
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
};

// Eliminar usuario por ID
export const deleteUsuario = (token, id) => {
    return new Promise((resolve, reject) => {
        axios.delete(`${BASE_URL}/api/users/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response);
            resolve(response.data); // Resuelve con los datos de la respuesta
        })
        .catch((error) => {
            console.log(error);
            reject(error); // Si hay un error, lo rechaza
        });
    });
};
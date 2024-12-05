import axios from "axios";
import { BASE_URL } from "./CONSTANTS";

// Obtener la lista general de todos los documentos
export const getListaDocumentos = (token) => {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/api/documents/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
            .then((response) => {
                console.log(response);
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};

// Crear un nuevo documento
export const postSaveDocumento = (token, documento) => {
    return new Promise((resolve, reject) => {
        axios.post(`${BASE_URL}/api/documents/`, documento, {
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((response) => {
                console.log(response);
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};

// Eliminar un documento
export const deleteDocumento = (token, id) => {
    return new Promise((resolve, reject) => {
        axios.delete(`${BASE_URL}/api/documents/${id}/`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log(response);
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};

// Obtener un documento específico por ID
export const getDocumentoById = (token, id) => {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/api/documents/${id}/`, {
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((response) => {
                console.log(response);
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};

// Actualizar un documento
export const patchUpdateDocumento = (token, id, documento) => {
    return new Promise((resolve, reject) => {
        axios.patch(`${BASE_URL}/api/documents/${id}/`, documento, {
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((response) => {
                console.log(response);
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};

export const getDocumentosByStudent = (token, studentId) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`${BASE_URL}/api/students/${studentId}/documents`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                console.log(response); // Para ver la respuesta
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error); // Para ver los errores
                reject(error);
            });
    });
};

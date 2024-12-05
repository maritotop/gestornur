import axios from "axios"
import { BASE_URL } from "./CONSTANTS"

export const getListaEstudiantes = (token) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/api/students/", {
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
                console.log(error);
                reject(error);
            });
    });
}

export const postSaveEstudiante = (token, studentData) => {
    return new Promise((resolve, reject) => {
        axios.post(BASE_URL + "/api/students", studentData, {
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
}
export const getEstudianteById = (token, studentId) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${BASE_URL}/api/students/${studentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response); // Para ver la respuesta del estudiante
          resolve(response.data);
        })
        .catch((error) => {
          console.error(error); // Para ver los errores
          reject(error);
        });
    });
  };

export const deleteEstudiante = (token, studentId) => {
    return new Promise((resolve, reject) => {
        axios.delete(`${BASE_URL}/api/students/${studentId}`, {
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
            console.log(error);
            reject(error);
        });
    });
}

export const putUpdateEstudiante = (token, studentId, studentData) => {
    return new Promise((resolve, reject) => {
        axios.put(`${BASE_URL}/api/students/${studentId}`, studentData, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response); // Confirmación de actualización
            resolve(response.data);
        })
        .catch((error) => {
            console.log(error); // Manejo de errores
            reject(error);
        });
    });
};

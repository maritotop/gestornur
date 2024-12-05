import axios from "axios"
import { BASE_URL } from "./CONSTANTS"

export const getListaPersonas = (token) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/webapi/condominios/", {
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

export const postSavePersona = (token, persona) => {
    return new Promise((resolve, reject) => {
        axios.post(BASE_URL + "/webapi/condominios/", persona, {
            headers: {
                "Content-Type": "application/json"
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

export const deletePersona = (token, id) => {
    return new Promise((resolve, reject) => {
      axios.delete(`${BASE_URL}/webapi/condominios/${id}/`, {
        headers: {
          "Content-Type": "application/json"
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

export const getListaTipoCondominio = (token) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/webapi/tipo_condominios/", {
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

export const getListaTipoDivision = (token) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/webapi/tipo_divisiones/", {
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

export const getCondominioById = (token, id) => {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/webapi/condominios/${id}/`, {
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

export const patchUpdateCondominio = (token, id, condominio) => {
    return new Promise((resolve, reject) => {
        axios.patch(`${BASE_URL}/webapi/condominios/${id}/`, condominio, {
            headers: {
                "Content-Type": "application/json"
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

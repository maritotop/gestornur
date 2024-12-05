import axios from "axios";
import { BASE_URL } from "./CONSTANTS";

/**
 * Obtiene la lista de auditorías del servidor.
 * @param {string} token Token de autenticación.
 * @returns {Promise<Object[]>} Lista de logs de auditoría.
 */
export const getListaAuditorias = (token) => {
  return new Promise((resolve, reject) => {
    axios.get(`${BASE_URL}/api/logs`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response.data);
        resolve(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener auditorías:", error);
        reject(error);
      });
  });
};

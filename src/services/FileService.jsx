import axios from "axios";
import { BASE_URL } from "./CONSTANTS";

/**
 * Sube un archivo al servidor.
 * @param {File} file - El archivo a subir.
 * @param {string} estudianteId - ID del estudiante asociado al documento.
 * @param {string} tipo - Tipo del documento.
 * @param {string} token - Token de autenticación.
 * @returns {Promise<Object>} Respuesta del servidor con la URL del archivo subido.
 */
export const uploadFile = async (file, estudianteId, tipo, token) => {
    if (!file) {
        throw new Error("No se ha proporcionado un archivo para subir.");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("estudianteId", estudianteId);
    formData.append("tipo", tipo);

    try {
        const response = await axios.post(`${BASE_URL}/api/documents`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data; // Supongamos que devuelve { url: "http://ruta-del-archivo" }
    } catch (error) {
        console.error("Error al subir el archivo:", error);
        if (error.response?.status === 401) {
            alert("No autorizado. Por favor, verifique sus credenciales.");
        }
        throw error;
    }
};

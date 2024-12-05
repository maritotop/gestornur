import { LOGIN_URL } from "../navigation/CONSTANTS";

export const getAuthToken = () => {
    const token = localStorage.getItem("token");
    return token;
}

export const getUserRole = () => {
    const rol = localStorage.getItem("rol"); // Asegúrate de que el rol se guarde como parte del objeto "user"
    return rol; 
};

export const setAuthToken = (token, refresh) => {
    localStorage.setItem("token", token);
    localStorage.setItem("refresh", refresh);
}
export const validateLogin = (navigate) => {
    const token = getAuthToken();
    if (token==null) {
        navigate(LOGIN_URL);
        return false;
    }
    return true;
}
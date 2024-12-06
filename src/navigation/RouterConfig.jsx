import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import { ABOUT_URL, HOME_URL, PERSONAS_LIST_URL, LOGIN_URL, PERSONA_CREATE_URL,
STUDENT_LIST_URL, 
STUDENT_SEARCH_URL,
DOCUMENT_LIST_URL,
DOCUMENT_STUDENT_URL,
STUDENT_CREATE_URL,
DOCUMENT_CREATE_URL,
AUDITORIA_LIST_URL,
USUARIO_CREATE_URL,
USUARIO_LIST_URL,
USUARIO_EDIT_URL,
STUDENT_EDIT_URL
} from "./CONSTANTS";
import PersonaListPage from "../pages/personas/PersonaListPage";
import LoginPage from "../pages/auth/LoginPage";
import PersonaFormPage from "../pages/personas/PersonaFormPage";
import StudentListPage from "../pages/students/StudentListPage";
import StudentSearch from "../pages/students/StudentSearch";
import DocumentListPage from "../pages/documentos/DocumentoListPage";
import DocumentosDelEstudiante from "../pages/documentos/DocumentosDelEstudiante";
import StudentFormPage from "../pages/students/StudentFormPage";
import DocumentoFormPage from "../pages/documentos/DocumentoFormPage";
import AuditoriaListPage from "../pages/auditoria/AuditoriaListPage";
import UsuarioFormPage from "../pages/usuarios/UsuarioFormPage";
import UsuarioListPage from "../pages/usuarios/UsuarioListPage";
import UsuarioEditFormPage from "../pages/usuarios/UsuarioEditFormPage";
import StudentFormEditPage from "../pages/students/StudentFormEditPage";


export const router = createBrowserRouter([
    {
        path: HOME_URL,
        element: <HomePage/>,
    },
    {
        path: ABOUT_URL,
        element: <AboutPage/>,
    },
    {
        path: PERSONAS_LIST_URL+":id",
        element: <PersonaListPage/>,
    },
    {
        path: LOGIN_URL,
        element: <LoginPage/>,
    },
    {
        path: PERSONA_CREATE_URL+":id",
        element: <PersonaFormPage/>,
    },
    {
        path: STUDENT_LIST_URL,
        element: <StudentListPage/>,
    },
    {
        path: STUDENT_SEARCH_URL,
        element: <StudentSearch/>,
    },
    {
        path: DOCUMENT_LIST_URL,
        element: <DocumentListPage/>,
    },
    {
        path: DOCUMENT_STUDENT_URL+":id",
        element: <DocumentosDelEstudiante/>,
    },
    {
        path: STUDENT_CREATE_URL,
        element: <StudentFormPage/>,
    },
    {
        path: DOCUMENT_CREATE_URL+":id",
        element: <DocumentoFormPage/>,
    },
    {
        path: AUDITORIA_LIST_URL,
        element: <AuditoriaListPage/>,
    },
    {
        path: USUARIO_CREATE_URL,
        element: <UsuarioFormPage/>,
    },
    {
        path: USUARIO_LIST_URL,
        element: <UsuarioListPage/>,
    },
    {
        path: USUARIO_EDIT_URL+":id",
        element: <UsuarioEditFormPage/>,
    },
    {
        path: STUDENT_EDIT_URL+":id",
        element: <StudentFormEditPage/>,
    },
    
]);
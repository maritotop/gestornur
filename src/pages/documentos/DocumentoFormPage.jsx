import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Alert, Button, Card, Container, Form, FormGroup } from "react-bootstrap";
import Menu from "../../components/Menu";
import { uploadFile } from "../../services/FileService"; // Servicio para subir archivos
import { DOCUMENT_STUDENT_URL } from "../../navigation/CONSTANTS";
import { getAuthToken } from "../../utilities/TokenUtilities";

const ALLOWED_EXTENSIONS = ["pdf", "doc", "docx", "jpg", "jpeg", "png"]; // Extensiones permitidas

const DocumentoFormPage = () => {
    const { id } = useParams(); // Captura el ID del estudiante desde la URL
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Estado de carga

    const [formData, setFormData] = useState({
        tipo: "certificadoNacimiento",
        archivo: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const extension = file.name.split(".").pop().toLowerCase();
            if (!ALLOWED_EXTENSIONS.includes(extension)) {
                alert("Solo se permiten archivos PDF, Word, JPG o PNG.");
                e.target.value = null;
                return;
            }
            setFormData({ ...formData, archivo: file });
        }
    };

    const onFormSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const form = e.currentTarget;
        let isValid = form.checkValidity();
        setValidated(true);

        if (!isValid) return;

        try {
            setIsLoading(true);
            const token = getAuthToken();
            if (!token) {
                alert("Sesión expirada o token no válido. Por favor, inicie sesión nuevamente.");
                return;
            }

            // Subir el archivo
            await uploadFile(formData.archivo, id, formData.tipo, token);

            // Navega a la página de documentos
            navigate(DOCUMENT_STUDENT_URL + id); // Cambiar esta ruta a la correcta para los documentos
        } catch (error) {
            console.error("Error al enviar los datos:", error);
            setShowAlertError(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Menu />
            <Container className="d-flex justify-content-center py-4">
                <Card className="w-100" style={{ maxWidth: "600px" }}>
                    <Card.Body>
                        <Card.Title className="text-center mb-4">Crear Documento</Card.Title>
                        {showAlertError && (
                            <Alert variant="danger">
                                Error al enviar los datos. Por favor, intente nuevamente.
                            </Alert>
                        )}
                        <Form noValidate onSubmit={onFormSubmit} validated={validated}>
                            <FormGroup className="mb-3">
                                <Form.Label>Tipo de Documento</Form.Label>
                                <Form.Select
                                    name="tipo"
                                    value={formData.tipo}
                                    required
                                    onChange={handleChange}
                                >
                                    <option value="certificadoNacimiento">Certificado de Nacimiento</option>
                                    <option value="tituloBachiller">Título de Bachiller</option>
                                    <option value="carnetIdentidad">Carnet de Identidad</option>
                                    <option value="certificadoEstudio">Certificado de Estudio</option>
                                    <option value="otroDocumento">Otro Documento</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Por favor, seleccione un tipo de documento.
                                </Form.Control.Feedback>
                            </FormGroup>

                            <FormGroup className="mb-3">
                                <Form.Label>Cargar Archivo</Form.Label>
                                <Form.Control
                                    type="file"
                                    required
                                    onChange={onFileChange}
                                    accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, cargue un archivo válido.
                                </Form.Control.Feedback>
                            </FormGroup>

                            <div className="d-flex justify-content-center mt-4">
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    style={{
                                        backgroundColor: "#22b3a4",
                                        borderColor: "#22b3a4",
                                        width: "auto",
                                        padding: "10px 20px",
                                        fontSize: "1rem",
                                        borderRadius: "5px",
                                    }}
                                    size="lg"
                                >
                                    {isLoading ? "Cargando..." : "Crear Documento"}
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default DocumentoFormPage;

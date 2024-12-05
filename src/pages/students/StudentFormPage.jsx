import { Alert, Button, Card, Container, Form, FormControl, FormGroup } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useState } from "react";
import { postSaveEstudiante } from "../../services/EstudiantesService"; // Asumiendo que este es tu servicio
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../../utilities/TokenUtilities";
import { STUDENT_LIST_URL } from "../../navigation/CONSTANTS"; // La URL a la lista de estudiantes

const StudentFormPage = () => {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);

    // Establecer los valores del formulario
    const [nroRegistro, setNroRegistro] = useState('');
    const [nombreCompleto, setNombreCompleto] = useState('');

    const onFormSubmit = (e) => {
        const form = e.currentTarget;
        let isValid = form.checkValidity();
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);

        if (!isValid) return;

        createStudent();
    };

    const createStudent = () => {
        setShowAlertError(false);

        postSaveEstudiante(getAuthToken(), {
            nroRegistro,
            nombreCompleto
        })
        .then((data) => {
            if (!data.id) {
                setShowAlertError(true);
                return;
            }
            navigate(STUDENT_LIST_URL); // Navegar a la lista de estudiantes después de guardar
        })
        .catch((error) => {
            console.log(error);
            setShowAlertError(true);
        });
    };

    return (
        <>
            <Menu />
            <Container className="d-flex justify-content-center py-4">
                <Card className="w-100" style={{ maxWidth: '500px' }}>
                    <Card.Body>
                        <Card.Title className="text-center mb-4">CREAR ESTUDIANTE</Card.Title>
                        <div>
                            {showAlertError && <Alert variant="danger">
                                Error al enviar los datos, por favor intente nuevamente.
                            </Alert>}
                            <Form noValidate onSubmit={onFormSubmit} validated={validated}>
                                <FormGroup className="mb-3">
                                    <Form.Label>Número de Registro</Form.Label>
                                    <FormControl 
                                        value={nroRegistro} 
                                        required 
                                        onChange={(e) => setNroRegistro(e.target.value)} 
                                        placeholder="Ej. 12345"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Necesitas un número de registro válido
                                    </Form.Control.Feedback>
                                </FormGroup>

                                <FormGroup className="mb-3">
                                    <Form.Label>Nombre Completo</Form.Label>
                                    <FormControl 
                                        value={nombreCompleto} 
                                        required 
                                        onChange={(e) => setNombreCompleto(e.target.value)} 
                                        placeholder="Ej. Juan Pérez"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Necesitas un nombre completo
                                    </Form.Control.Feedback>
                                </FormGroup>

                                <div className="d-flex justify-content-center mt-4">
                                    <Button 
                                        type="submit" 
                                        style={{
                                            backgroundColor: '#22b3a4', 
                                            borderColor: '#22b3a4', 
                                            width: 'auto',
                                            padding: '10px 20px', // Tamaño moderado
                                            fontSize: '1rem', // Tamaño de fuente adecuado
                                            borderRadius: '5px' // Bordes suaves para un estilo más moderno
                                        }} 
                                        size="lg" // Un tamaño moderado de botón
                                    >
                                        Crear Estudiante
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default StudentFormPage;

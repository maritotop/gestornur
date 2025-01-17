import { useEffect, useState } from "react";
import { Alert, Button, Card, Container, Form, FormControl, FormGroup } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useNavigate, useParams } from "react-router-dom";
import { getEstudianteById, putUpdateEstudiante } from "../../services/EstudiantesService";
import { getAuthToken } from "../../utilities/TokenUtilities";
import { STUDENT_LIST_URL } from "../../navigation/CONSTANTS";

const StudentFormEditPage = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Obtener el id del estudiante de la URL
    const [validated, setValidated] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);

    // Estado para los datos del estudiante
    const [nroRegistro, setNroRegistro] = useState('');
    const [nombreCompleto, setNombreCompleto] = useState('');

    useEffect(() => {
        loadStudentData();
    }, []);

    // Función para cargar los datos del estudiante
    const loadStudentData = () => {
        const token = getAuthToken();
        getEstudianteById(token, id)
            .then((data) => {
                setNroRegistro(data.nroRegistro);
                setNombreCompleto(data.nombreCompleto);
            })
            .catch((error) => {
                setShowAlertError(true);
            });
    };

    const onFormSubmit = (e) => {
        const form = e.currentTarget;
        let isValid = form.checkValidity();
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);

        if (!isValid) return;

        updateStudent();
    };

    // Función para actualizar el estudiante
    const updateStudent = () => {
        const token = getAuthToken();
        setShowAlertError(false);

        putUpdateEstudiante(token, id, { nroRegistro, nombreCompleto })
            .then(() => {
                navigate(STUDENT_LIST_URL); // Redirigir a la lista de estudiantes
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
                        <Card.Title className="text-center mb-4">EDITAR ESTUDIANTE</Card.Title>
                        {showAlertError && (
                            <Alert variant="danger">
                                Error al actualizar los datos, por favor intente nuevamente.
                            </Alert>
                        )}
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
                                        padding: '10px 20px',
                                        fontSize: '1rem',
                                        borderRadius: '5px',
                                    }}
                                    size="lg"
                                >
                                    Actualizar Estudiante
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default StudentFormEditPage;

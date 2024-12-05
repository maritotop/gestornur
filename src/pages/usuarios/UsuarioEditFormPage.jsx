import { useEffect, useState } from "react";
import { Alert, Button, Card, Container, Form, FormControl, FormGroup } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useNavigate, useParams } from "react-router-dom";
import { getAuthToken } from "../../utilities/TokenUtilities";
import { USUARIO_LIST_URL } from "../../navigation/CONSTANTS";
import { getUsuarioById, updateUsuario } from "../../services/UsuariosService"; // Asegúrate de tener estas funciones en tu servicio.

const UsuarioEditFormPage = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Captura el ID del usuario desde la URL.
    const [validated, setValidated] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);

    // Estado inicial del formulario.
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [rol, setRol] = useState('');

    useEffect(() => {
        // Cargar los datos del usuario al montar el componente.
        getUsuarioById(getAuthToken(), id)
            .then((data) => {
                if (data) {
                    setName(data.name);
                    setEmail(data.email);
                    setRol(data.rol);
                }
            })
            .catch((error) => {
                console.error("Error al cargar el usuario:", error);
                setShowAlertError(true);
            });
    }, [id]);

    const onFormSubmit = (e) => {
        const form = e.currentTarget;
        const isValid = form.checkValidity();
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);

        if (!isValid) return;

        updateUser();
    };

    const updateUser = () => {
        setShowAlertError(false);

        // Construir los datos a enviar al backend.
        const payload = { name, email, rol }; // Contraseña excluida
        updateUsuario(getAuthToken(), id, payload)
            .then(() => {
                navigate(USUARIO_LIST_URL); // Navegar a la lista después de guardar.
            })
            .catch((error) => {
                console.error("Error al actualizar el usuario:", error);
                setShowAlertError(true);
            });
    };

    return (
        <>
            <Menu />
            <Container className="d-flex justify-content-center py-4">
                <Card className="w-100" style={{ maxWidth: '500px' }}>
                    <Card.Body>
                        <Card.Title className="text-center mb-4">EDITAR USUARIO</Card.Title>
                        {showAlertError && (
                            <Alert variant="danger">
                                Error al guardar los datos. Por favor, intente nuevamente.
                            </Alert>
                        )}
                        <Form noValidate onSubmit={onFormSubmit} validated={validated}>
                            <FormGroup className="mb-3">
                                <Form.Label>Nombre</Form.Label>
                                <FormControl
                                    value={name}
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Ej. Juan Pérez"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Necesitas un nombre válido.
                                </Form.Control.Feedback>
                            </FormGroup>

                            <FormGroup className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <FormControl
                                    type="email"
                                    value={email}
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Ej. usuario@dominio.com"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Necesitas un email válido.
                                </Form.Control.Feedback>
                            </FormGroup>

                            <FormGroup className="mb-3">
                                <Form.Label>Contraseña</Form.Label>
                                <FormControl
                                    type="password"
                                    value=""
                                    placeholder="No es editable"
                                    disabled // Campo deshabilitado
                                />
                            </FormGroup>

                            <FormGroup className="mb-3">
                                <Form.Label>Rol</Form.Label>
                                <Form.Select
                                    value={rol}
                                    required
                                    onChange={(e) => setRol(e.target.value)}
                                >
                                    <option value="">Selecciona un rol</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">Usuario</option>
                                    <option value="superadmin">Superadmin</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Necesitas seleccionar un rol válido.
                                </Form.Control.Feedback>
                            </FormGroup>

                            <div className="d-flex justify-content-center mt-4">
                                <Button
                                    type="submit"
                                    style={{
                                        backgroundColor: '#22b3a4',
                                        borderColor: '#22b3a4',
                                        padding: '10px 20px',
                                        fontSize: '1rem',
                                        borderRadius: '5px',
                                    }}
                                    size="lg"
                                >
                                    Guardar Cambios
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default UsuarioEditFormPage;

import { Alert, Button, Card, Container, Form, FormControl, FormGroup } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useState } from "react";
import { postSaveUser } from "../../services/UsuariosService"; // Servicio para manejar usuarios
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../../utilities/TokenUtilities";
import { USUARIO_LIST_URL } from "../../navigation/CONSTANTS"; // La URL a la lista de estudiantes


const UsuarioFormPage = () => {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);

    // Establecer los valores del formulario
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState('');

    const onFormSubmit = (e) => {
        const form = e.currentTarget;
        let isValid = form.checkValidity();
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);

        if (!isValid) return;

        createUser();
    };

    const createUser = () => {
        setShowAlertError(false);

        postSaveUser(getAuthToken(), {
            name,
            email,
            password,
            rol
        })
        .then((data) => {
            if (!data.id) {
                setShowAlertError(true);
                return;
            }
            navigate(USUARIO_LIST_URL); // Navegar a la lista de estudiantes después de guardar
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
                        <Card.Title className="text-center mb-4">CREAR USUARIO</Card.Title>
                        <div>
                            {showAlertError && <Alert variant="danger">
                                Error al enviar los datos, por favor intente nuevamente.
                            </Alert>}
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
                                        Necesitas un nombre válido
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
                                        Necesitas un email válido
                                    </Form.Control.Feedback>
                                </FormGroup>

                                <FormGroup className="mb-3">
                                    <Form.Label>Contraseña</Form.Label>
                                    <FormControl 
                                        type="password"
                                        value={password} 
                                        required 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        placeholder="Mínimo 8 caracteres"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Necesitas una contraseña válida
                                    </Form.Control.Feedback>
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
                                        Necesitas seleccionar un rol válido
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
                                            borderRadius: '5px'
                                        }} 
                                        size="lg"
                                    >
                                        Crear Usuario
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

export default UsuarioFormPage;

import { Alert, Button, Card, Container, Form, FormControl, FormGroup } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useState } from "react";
import { postLogin } from "../../services";
import { useNavigate } from "react-router-dom";
import { PERSONAS_LIST_URL, STUDENT_LIST_URL, STUDENT_SEARCH_URL } from "../../navigation/CONSTANTS";
import { getAutenticatedUser } from "../../services/AuthService";

const LoginPage = () => {
    const navigate = useNavigate();

    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAlertError, setShowAlertError] = useState(false);

    const onLoginSubmit = (e) => {
        const form = e.currentTarget;

        let isValid = form.checkValidity();

        e.preventDefault();
        e.stopPropagation();

        setValidated(true);
        
        if (!isValid) return;
        doLogin();
    }

    const doLogin = () => {
        setShowAlertError(false);
        postLogin(email, password)
            .then((data) => {
                localStorage.setItem("token", data.token);
                localStorage.setItem("refresh", data.refresh);
                getAutenticatedUser(data.token)
                    .then((user) => {
                        localStorage.setItem("rol", user.rol);
                        navigate(STUDENT_SEARCH_URL);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    setShowAlertError(true);
                } else {
                    console.log(error);
                }
            });
    }

    return (
        <>
            <Menu />
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', background: 'linear-gradient(to right, #ffffff, #ffffff)' }}>
                <Card className="shadow-lg p-4" style={{ width: '100%', maxWidth: '400px', borderRadius: '15px', backgroundColor: 'white' }}>
                    <Card.Body>
                        <Card.Title className="text-center mb-4" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>
                            <strong>Bienvenido(a)</strong>
                        </Card.Title>
                        {showAlertError && 
                            <Alert variant="danger" className="text-center mb-3">
                                <strong>Email o contraseña incorrectas</strong>
                            </Alert>
                        }
                        <Form noValidate onSubmit={onLoginSubmit} validated={validated}>
                            <FormGroup className="mb-3">
                                <Form.Label className="font-weight-bold">Email</Form.Label>
                                <FormControl
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    type="email"
                                    placeholder="Introduce tu email"
                                    style={{
                                        borderRadius: '10px',
                                        padding: '12px',
                                        border: '1px solid #ccc',
                                        fontSize: '1rem',
                                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                        transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
                                    }}
                                    onFocus={(e) => e.target.style.boxShadow = '0 0 8px rgba(34, 179, 164, 0.5)'}
                                    onBlur={(e) => e.target.style.boxShadow = 'none'}
                                />
                                <Form.Control.Feedback type="invalid">Necesitas un email válido</Form.Control.Feedback>
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <Form.Label className="font-weight-bold">Contraseña</Form.Label>
                                <FormControl
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    type="password"
                                    placeholder="Introduce tu contraseña"
                                    style={{
                                        borderRadius: '10px',
                                        padding: '12px',
                                        border: '1px solid #ccc',
                                        fontSize: '1rem',
                                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                        transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
                                    }}
                                    onFocus={(e) => e.target.style.boxShadow = '0 0 8px rgba(34, 179, 164, 0.5)'}
                                    onBlur={(e) => e.target.style.boxShadow = 'none'}
                                />
                                <Form.Control.Feedback type="invalid">Necesitas una contraseña</Form.Control.Feedback>
                            </FormGroup>
                            <div className="d-grid gap-2">
                                <Button
                                    type="submit"
                                    style={{
                                        backgroundColor: '#22b3a4',
                                        borderColor: '#22b3a4',
                                        borderRadius: '10px',
                                        padding: '14px',
                                        fontSize: '1.1rem',
                                        transition: 'transform 0.2s ease',
                                        boxShadow: '0 4px 8px rgba(34, 179, 164, 0.3)'
                                    }}
                                    className="text-white"
                                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                >
                                    Iniciar Sesión
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default LoginPage;

import { Alert, Button, Card, Container, Form, FormControl, FormGroup, FormSelect } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useEffect, useState } from "react";
import { postLogin, postSavePersona } from "../../services";
import { useNavigate, useParams } from "react-router-dom";
import { PERSONAS_LIST_URL } from "../../navigation/CONSTANTS";
import { getAuthToken } from "../../utilities/TokenUtilities";
import { getListaTipoCondominio, getListaTipoDivision } from "../../services/PersonasService";


const PersonaFormPage = () => {
    const navigate = useNavigate();

    const [validated, setValidated] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false)

    const [nombre, setNombre] = useState('');
    const [tipo_condominio_id, setTipo_condominio_id] = useState('');
    const [tipo_division_id, setTipo_division_id] = useState('');
    const [latitud, setLatitud] = useState('');
    const [longitud, setLongitud] = useState('');
    const [capacidad_estacionamiento, setCapacidadEstacionamiento] = useState('');

    const [listaTipoCondominio, setListaTipoCondominio] = useState([]);
    const [listaTipoDivision, setListaTipoDivision] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        loadTipoCondominio()
        loadTipoDivision()
    }, [])
    

    const loadTipoCondominio = () => {
        getListaTipoCondominio(getAuthToken()).then((data) => {
            setListaTipoCondominio(data);
            
        });
    }
    const loadTipoDivision = () => {
        getListaTipoDivision(getAuthToken()).then((data) => {
            setListaTipoDivision(data);
        });
    }


    const onPersonaFormSubmit = (e) => {
        const form = e.currentTarget;
        let isValid = form.checkValidity();
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);
        if (!isValid) return;

        createPersona();

    }

    const createPersona = () => {
        setShowAlertError(false);
        let tipoDivisionPredeterminadoId = '';
        let tipoCondominioId = '';
        
        if (tipo_condominio_id === 'VERTICAL') {
            // Si el tipo de condominio es "VERTICAL", establece el tipo de división a "BLOQUE"
            tipoCondominioId = 1; // Identificador numérico para VERTICAL
            const tipoDivisionBloque = listaTipoDivision.find(division => division.nombre_division === 'Bloque');
            if (tipoDivisionBloque) {
                tipoDivisionPredeterminadoId = tipoDivisionBloque.id;
            }
        } else if (tipo_condominio_id === 'HORIZONTAL') {
            // Si el tipo de condominio es "HORIZONTAL", establece el tipo de división a "MANZANA"
            tipoCondominioId = 2; // Identificador numérico para HORIZONTAL
            const tipoDivisionManzana = listaTipoDivision.find(division => division.nombre_division === 'Manzana');
            if (tipoDivisionManzana) {
                tipoDivisionPredeterminadoId = tipoDivisionManzana.id;
            }
        }
    
        postSavePersona(getAuthToken(), {
            nombre,
            creador:id,
            tipoCondominioId_id: tipoCondominioId,
            tipoDivisionId_id: tipoDivisionPredeterminadoId, // Utiliza el identificador predeterminado
            latitud,
            longitud,
            capacidad_estacionamiento,
        })
        .then((data) => {
            if (!data.id) {
                setShowAlertError(true);
                return;
            }
            navigate(PERSONAS_LIST_URL + id);
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
            <Container>
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title>
                            Crear condominio
                        </Card.Title>
                        <div>
                            {showAlertError && <Alert variant="danger">
                                Error al enviar enviar datos, por favor intente nuevamente
                            </Alert>}
                            <Form noValidate onSubmit={onPersonaFormSubmit} validated={validated}>
                                <FormGroup>
                                    <label>Nombre del condominio</label>
                                    <FormControl value={nombre} required
                                        onChange={(e) => {
                                            setNombre(e.target.value);
                                        }} />
                                    <Form.Control.Feedback type="invalid">Necesitas un nombre</Form.Control.Feedback>
                                </FormGroup>
                              
                                <FormGroup>
                                    <label>Tipo de condominio</label>
                                    <FormSelect required value={tipo_condominio_id} onChange={(e) => {
                                        setTipo_condominio_id(e.target.value);
                                        // Establecer automáticamente el tipo de división basado en el tipo de condominio seleccionado
                                        if (e.target.value === 'VERTICAL') {
                                            const tipoDivisionBloque = listaTipoDivision.find(division => division.nombre_division === 'Bloque');
                                            if (tipoDivisionBloque) {
                                                setTipo_division_id(tipoDivisionBloque.id);
                                            }
                                        } else if (e.target.value === 'HORIZONTAL') {
                                            const tipoDivisionManzana = listaTipoDivision.find(division => division.nombre_division === 'Manzana');
                                            if (tipoDivisionManzana) {
                                                setTipo_division_id(tipoDivisionManzana.id);
                                            }
                                        }
                                    }}>
                                        <option value="">Selecciona...</option>
                                        <option value="VERTICAL">Vertical</option>
                                        <option value="HORIZONTAL">Horizontal</option>
                                    </FormSelect>
                                </FormGroup>
                                <FormGroup>
                                    <label>Tipo de Division</label>
                                    <FormSelect disabled value={tipo_division_id} onChange={(e) => setTipo_division_id(e.target.value)}>
                                        <option value="">Selecciona...</option>
                                        {listaTipoDivision.map(division =>
                                            <option key={division.id} value={division.id}>{division.nombre_division}</option>
                                        )}
                                    </FormSelect>
                                </FormGroup>
                                <FormGroup>
                                    <label>Latitud</label>
                                    <FormControl 
                                        type="number" 
                                        step="any" 
                                        value={latitud} 
                                        onChange={(e) => setLatitud(e.target.value)} 
                                        required 
                                    />
                                    <Form.Control.Feedback type="invalid">Necesitas una latitud válida</Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup>
                                    <label>Longitud</label>
                                    <FormControl 
                                        type="number" 
                                        step="any" 
                                        value={longitud} 
                                        onChange={(e) => setLongitud(e.target.value)} 
                                        required 
                                    />
                                    <Form.Control.Feedback type="invalid">Necesitas una longitud válida</Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup>
                                    <label>Capacidad de estacionamiento</label>
                                    <FormControl 
                                        type="number" 
                                        step="any" 
                                        value={capacidad_estacionamiento} 
                                        onChange={(e) => setCapacidadEstacionamiento(e.target.value)} 
                                        required 
                                    />
                                    <Form.Control.Feedback type="invalid">Necesitas una longitud válida</Form.Control.Feedback>
                                </FormGroup>
                                <div className="mt-3">
                                    <Button type="submit">Crear condominio</Button>
                                </div>
                            </Form>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default PersonaFormPage;

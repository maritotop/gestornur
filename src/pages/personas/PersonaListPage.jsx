import React, { useEffect, useState } from "react";
import { Card, Container, Table, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getAuthToken } from "../../utilities/TokenUtilities";
import { useNavigate } from "react-router-dom";
import { getListaPersonas, patchUpdateCondominio } from "../../services/PersonasService";
import Menu from "../../components/Menu";

const PersonaListPage = () => {
  const navigate = useNavigate();
  const [listaPersonas, setListaPersonas] = useState([]);
  const [showAlertError, setShowAlertError] = useState(false);
  const { id } = useParams(); // Obtener el ID del usuario por URL


  useEffect(() => {
    loadPersonas();
  }, []);

  const loadPersonas = () => {
    getListaPersonas(getAuthToken()).then((data) => {
      localStorage.setItem('personaid', id);
      const personasUsuario = data.filter((persona) => persona.creador == id);
      setListaPersonas(personasUsuario);
      console.log(personasUsuario);
    });
  };

  const updateCondominio = (id) => {
    setShowAlertError(false);
    patchUpdateCondominio(getAuthToken(), id, { activo: true })
      .then((data) => {
        if (!data.id) {
          setShowAlertError(true);
          return;
        }
        loadPersonas();
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setShowAlertError(true);
        } else {
          console.log(error);
        }
      });
  };

  const irA = (id, pagina) => {
    if (pagina === 'Manzana') navigate(`/manzana/list/${id}`);
    if (pagina === 'Bloque') navigate(`/bloque/list/${id}`);
    
  }

  // Filtrar solo las personas con estado activo
  const personasActivas = listaPersonas.filter((persona) => !persona.activo);

  return (
    <>
    <Menu />
      <Container>
        <Card>
          <Card.Body>
            <Card.Title>Lista de condominios</Card.Title>
            <Link to={`/personas/create/${id}`}>
              <Button variant="primary">Crear condominios</Button>
            </Link>
            <Table>
              <thead>
                <tr>
                  <th>Nombre del condominio</th>
                  <th>Tipo de condominio</th>
                  <th>Tipo de division</th>
                  <th>Longitud</th>
                  <th>Latitud</th>
                  <th>Estacionamientos</th>
                  <th>Editar</th>
                  <th>Divisiones</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {personasActivas.map((persona) => (
                  <tr key={persona.id}>
                    <td>{persona.nombre}</td>
                    <td>{persona.tipoCondominioId.nombre_tipo_condominio}</td>
                    <td>{persona.tipoDivisionId.nombre_division}</td>
                    <td>{persona.longitud}</td>
                    <td>{persona.latitud}</td>
                    <td>{persona.capacidad_estacionamiento}</td>
                    <td>
                      <Link to={`/condominio/edit/${persona.id}`}>
                        <Button variant="primary">Editar</Button>
                      </Link>
                    </td>
                    <td>
                      <Button variant="success" onClick={() => irA(persona.id, persona.tipoDivisionId.nombre_division)}>Ver divisiones</Button>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => updateCondominio(persona.id)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default PersonaListPage;

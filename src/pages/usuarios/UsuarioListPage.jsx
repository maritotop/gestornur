import React, { useEffect, useState } from "react";
import { Card, Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAuthToken } from "../../utilities/TokenUtilities";
import { useNavigate } from "react-router-dom";
import { getListaUsuarios } from "../../services/UsuariosService";  // Asegúrate de tener este servicio
import Menu from "../../components/Menu";

const UsuarioListPage = () => {
  const navigate = useNavigate(); // Usamos el hook navigate para redirigir
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [showAlertError, setShowAlertError] = useState(false);

  useEffect(() => {
    loadUsuarios();
  }, []);

  const loadUsuarios = () => {
    getListaUsuarios(getAuthToken()).then((data) => {
      const usuarios = data;
      setListaUsuarios(usuarios);
      console.log(usuarios);
    });
  };

  const editarUsuario = (id) => {
    navigate(`/usuarios/edit/${id}`); // Redirige a la página de edición de usuario
  };

  const eliminarUsuario = (id) => {
    console.log(`Eliminar usuario con ID: ${id}`); // Aquí puedes agregar la lógica para eliminar
  };

  return (
    <>
      <Menu />
      <Container>
        <Card style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: "8px", marginTop: "20px" }}>
          <Card.Body>
            <Card.Title style={{ textAlign: "center", fontSize: "1.5rem", color: "black", fontWeight: "bold" }}>
              LISTA DE USUARIOS
            </Card.Title>
            <div style={{ textAlign: "right", marginBottom: "1rem" }}>
              <Link to={`/usuarios/create`}>
                <Button
                  style={{
                    backgroundColor: "#22b3a4",
                    borderColor: "#22b3a4",
                    color: "#fff",
                    padding: "0.5rem 1rem",
                    fontSize: "0.9rem",
                    borderRadius: "5px",
                  }}
                >
                  Crear Usuario
                </Button>
              </Link>
            </div>
            <div className="table-responsive">
              <Table bordered hover style={{ borderRadius: "8px", overflow: "hidden" }}>
                <thead style={{ backgroundColor: "#f7f7f7", borderBottom: "2px solid #22b3a4" }}>
                  <tr>
                    <th style={{ textAlign: "center", fontWeight: "bold", fontSize: "1rem", color: "black" }}>
                      ID
                    </th>
                    <th style={{ textAlign: "center", fontWeight: "bold", fontSize: "1rem", color: "black" }}>
                      NOMBRE
                    </th>
                    <th style={{ textAlign: "center", fontWeight: "bold", fontSize: "1rem", color: "black" }}>
                      EMAIL
                    </th>
                    <th style={{ textAlign: "center", fontWeight: "bold", fontSize: "1rem", color: "black" }}>
                      EDITAR
                    </th>
                    <th style={{ textAlign: "center", fontWeight: "bold", fontSize: "1rem", color: "black" }}>
                      ELIMINAR
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listaUsuarios.map((usuario) => (
                    <tr key={usuario.id}>
                      <td style={{ textAlign: "center", padding: "0.75rem" }}>{usuario.id}</td>
                      <td style={{ textAlign: "center", padding: "0.75rem" }}>{usuario.name}</td>
                      <td style={{ textAlign: "center", padding: "0.75rem" }}>{usuario.email}</td>
                      <td style={{ textAlign: "center", padding: "0.75rem" }}>
                        <Button
                          style={{
                            backgroundColor: "#22b3a4",
                            borderColor: "#22b3a4",
                            color: "#fff",
                            padding: "0.4rem 0.8rem",
                            fontSize: "0.8rem",
                            borderRadius: "5px",
                          }}
                          onClick={() => editarUsuario(usuario.id)}
                        >
                          Editar
                        </Button>
                      </td>
                      <td style={{ textAlign: "center", padding: "0.75rem" }}>
                        <Button
                          style={{
                            backgroundColor: "#e74c3c",
                            borderColor: "#e74c3c",
                            color: "#fff",
                            padding: "0.4rem 0.8rem",
                            fontSize: "0.8rem",
                            borderRadius: "5px",
                          }}
                          onClick={() => eliminarUsuario(usuario.id)}
                        >
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default UsuarioListPage;

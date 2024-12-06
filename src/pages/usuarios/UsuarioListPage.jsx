import React, { useEffect, useState } from "react";
import { Card, Container, Table, Button, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAuthToken } from "../../utilities/TokenUtilities";
import { useNavigate } from "react-router-dom";
import { getListaUsuarios, deleteUsuario } from "../../services/UsuariosService";
import Menu from "../../components/Menu";

const UsuarioListPage = () => {
  const navigate = useNavigate();
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);  // Número de usuarios por página
  const [showAlertError, setShowAlertError] = useState(false);

  useEffect(() => {
    loadUsuarios();
  }, []);

  const loadUsuarios = () => {
    getListaUsuarios(getAuthToken()).then((data) => {
      const usuarios = data;
      setListaUsuarios(usuarios);
    });
  };

  const editarUsuario = (id) => {
    navigate(`/usuarios/edit/${id}`); // Redirige a la página de edición de usuario
  };

  const eliminarUsuario = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.")) {
      deleteUsuario(getAuthToken(), id)
        .then(() => {
          alert("Usuario eliminado con éxito.");
          loadUsuarios(); // Recargar la lista de usuarios
        })
        .catch((err) => {
          console.error(err);
          alert("Hubo un error al eliminar el usuario.");
        });
    }
  };

  // Calcular los índices de los usuarios a mostrar en la página actual
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = listaUsuarios.slice(indexOfFirstUser, indexOfLastUser);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Páginas totales
  const totalPages = Math.ceil(listaUsuarios.length / usersPerPage);

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
                    <th style={{ textAlign: "center", fontWeight: "bold", fontSize: "1rem", color: "black" }}>ID</th>
                    <th style={{ textAlign: "center", fontWeight: "bold", fontSize: "1rem", color: "black" }}>NOMBRE</th>
                    <th style={{ textAlign: "center", fontWeight: "bold", fontSize: "1rem", color: "black" }}>EMAIL</th>
                    <th style={{ textAlign: "center", fontWeight: "bold", fontSize: "1rem", color: "black" }}>EDITAR</th>
                    <th style={{ textAlign: "center", fontWeight: "bold", fontSize: "1rem", color: "black" }}>ELIMINAR</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((usuario) => (
                    <tr key={usuario.id}>
                      <td style={{ textAlign: "center", padding: "0.75rem" }}>{usuario.id}</td>
                      <td style={{ textAlign: "center", padding: "0.75rem" }}>{usuario.name}</td>
                      <td style={{ textAlign: "center", padding: "0.75rem" }}>{usuario.email}</td>
                      <td style={{ textAlign: "center", padding: "0.75rem" }}>
                        <Button
                          style={{
                            backgroundColor: "#22b3a4",
                            borderColor: "#22b3a4",
                            color: "white",
                            fontWeight: "bold",
                            borderRadius: "8px",
                            padding: "8px 12px",
                            fontSize: "0.9rem",
                          }}
                          onClick={() => editarUsuario(usuario.id)}
                        >
                          Editar
                        </Button>
                      </td>
                      <td style={{ textAlign: "center", padding: "0.75rem" }}>
                        <Button variant="danger" onClick={() => eliminarUsuario(usuario.id)}>
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* Paginación */}
              <div className="d-flex justify-content-center mt-3">
                <Pagination>
                  <Pagination.Prev
                    disabled={currentPage === 1}
                    onClick={() => paginate(currentPage - 1)}
                  />
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                    <Pagination.Item
                      key={pageNumber}
                      active={pageNumber === currentPage}
                      onClick={() => paginate(pageNumber)}
                    >
                      {pageNumber}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    disabled={currentPage === totalPages}
                    onClick={() => paginate(currentPage + 1)}
                  />
                </Pagination>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default UsuarioListPage;

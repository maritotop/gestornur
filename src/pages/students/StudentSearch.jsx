import React, { useState } from "react";
import { Card, Container, Form, Button, Alert, Table, Spinner } from "react-bootstrap";
import { getAuthToken } from "../../utilities/TokenUtilities";
import { getListaEstudiantes } from "../../services/EstudiantesService";
import Menu from "../../components/Menu";
import { DOCUMENT_STUDENT_URL } from "../../navigation/CONSTANTS";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Para el icono de lupa

const StudentSearch = () => {
  const navigate = useNavigate();
  const [nroRegistro, setNroRegistro] = useState(""); // Número de registro a buscar
  const [student, setStudent] = useState(null); // Datos del estudiante encontrado
  const [error, setError] = useState(""); // Mensaje de error
  const [loading, setLoading] = useState(false); // Estado de carga
  const [userRole, setUserRole] = useState(localStorage.getItem("rol")); // Obtener el rol del usuario desde el localStorage

  // Función para manejar el cambio en el campo de número de registro
  const handleInputChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
    setNroRegistro(value);
  };

  const buscarEstudiante = () => {
    if (!nroRegistro) {
      setError("Por favor, ingrese un número de registro.");
      return;
    }

    setError("");
    setStudent(null);
    setLoading(true); // Iniciar carga

    // Llamar a la API para obtener la lista de estudiantes
    getListaEstudiantes(getAuthToken())
      .then((data) => {
        const encontrado = data.find((student) => student.nroRegistro === nroRegistro);
        if (encontrado) {
          setStudent(encontrado);
        } else {
          setError("No se encontró un estudiante con ese número de registro.");
        }
      })
      .catch((err) => {
        console.error("Error al buscar el estudiante:", err);
        setError("Hubo un error al realizar la búsqueda.");
      })
      .finally(() => {
        setLoading(false); // Finalizar carga
      });
  };

  // Función para ver los documentos del estudiante
  const verDocumentos = (id) => () => {
    console.log("Ver documentos del estudiante con ID", id);
    navigate(DOCUMENT_STUDENT_URL + id);
  };

  // Función para editar el estudiante
  const editarEstudiante = (id) => {
    navigate(`/students/edit/${id}`); // Redirigir a la página de edición
  };

  return (
    <>
      <Menu />
      <Container className="py-5">
        <Card className="shadow-lg rounded-lg">
          <Card.Body>
            <Card.Title className="text-center mb-4" style={{ color: "#333" }}>BUSCAR ESTUDIANTE</Card.Title>
            <Form>
              <Form.Group className="mb-4">
                <Form.Label className="d-block text-center">Número de Registro</Form.Label>
                <div className="d-flex justify-content-center">
                  <Form.Control
                    type="text"
                    placeholder="Ingrese el número de registro"
                    value={nroRegistro}
                    onChange={handleInputChange}
                    className="me-2"
                    style={{ maxWidth: "300px", borderRadius: "8px" }}
                  />
                  <Button
                    className="btn-custom-search d-flex align-items-center"
                    onClick={buscarEstudiante}
                    disabled={loading}
                    style={{
                      backgroundColor: "#22b3a4",
                      borderColor: "#22b3a4",
                      color: "white",
                      fontWeight: "bold",
                      borderRadius: "8px",
                      fontSize: "0.9rem",
                      padding: "8px 12px"
                    }}
                  >
                    {loading ? (
                      <Spinner animation="border" size="sm" className="me-2" />
                    ) : (
                      <FaSearch className="me-2" />
                    )}
                    Buscar
                  </Button>
                </div>
              </Form.Group>
            </Form>

            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

            {student && (
              <Table striped bordered hover responsive className="mt-4">
                <thead style={{ backgroundColor: "#22b3a4", color: "white" }} className="text-center">
                  <tr>
                    <th>Nº DE REGISTRO</th>
                    <th>NOMBRE COMPLETO</th>
                    <th>VER</th>
                    {/* Mostrar el botón "Editar" solo si el usuario es admin o superadmin */}
                    {(userRole === "admin" || userRole === "superadmin") && <th>EDITAR</th>}
                  </tr>
                </thead>
                <tbody className="text-center">
                  <tr>
                    <td>{student.nroRegistro}</td>
                    <td>{student.nombreCompleto}</td>
                    <td>
                      <Button
                        className="btn-custom-view btn-sm"
                        onClick={verDocumentos(student.id)}
                        style={{
                          backgroundColor: "#22b3a4",
                          borderColor: "#22b3a4",
                          color: "white",
                          fontWeight: "bold",
                          borderRadius: "8px",
                          padding: "6px 10px"
                        }}
                      >
                        Ver documentos
                      </Button>
                    </td>
                    {/* Si el usuario es admin o superadmin, mostrar el botón de editar */}
                    {(userRole === "admin" || userRole === "superadmin") && (
                      <td>
                        <Button
                          className="btn-custom-edit btn-sm"
                          onClick={() => editarEstudiante(student.id)}
                          style={{
                            backgroundColor: "#f39c12",
                            borderColor: "#f39c12",
                            color: "white",
                            fontWeight: "bold",
                            borderRadius: "8px",
                            padding: "6px 10px"
                          }}
                        >
                          Editar
                        </Button>
                      </td>
                    )}
                  </tr>
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default StudentSearch;

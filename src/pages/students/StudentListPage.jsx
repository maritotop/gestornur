import React, { useEffect, useState } from "react";
import { Card, Container, Table, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getAuthToken } from "../../utilities/TokenUtilities";
import { useNavigate } from "react-router-dom";
import { getListaEstudiantes } from "../../services/EstudiantesService"; // Eliminé la función deleteEstudiante
import Menu from "../../components/Menu";
import { DOCUMENT_STUDENT_URL } from "../../navigation/CONSTANTS";

const StudentListPage = () => {
  const navigate = useNavigate();
  const [listaStudents, setListaStudents] = useState([]);
  const [showAlertError, setShowAlertError] = useState(false);
  const [userRole, setUserRole] = useState(localStorage.getItem("rol")); // Obtener el rol del usuario desde el localStorage
  const { id } = useParams();

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = () => {
    getListaEstudiantes(getAuthToken()).then((data) => {
      const students = data;
      setListaStudents(students);
      console.log(students);
    });
  };

  const verDocumentos = (id) => {
    navigate(DOCUMENT_STUDENT_URL + id);
  };

  // Función de redirección para el botón de "Editar"
  const editarEstudiante = (id) => {
    // Redirige a la página de edición (deberías crear esta ruta más adelante)
    navigate(`/students/edit/${id}`);
  };

  return (
    <>
      <Menu />
      <Container>
        <Card style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: "8px", marginTop: "20px" }}>
          <Card.Body>
            <Card.Title style={{ textAlign: "center", fontSize: "1.5rem", color: "black", fontWeight: "bold" }}>
              LISTA DE ESTUDIANTES
            </Card.Title>
            <div style={{ textAlign: "right", marginBottom: "1rem" }}>
              <Link to={`/students/create`}>
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
                  Crear Estudiante
                </Button>
              </Link>
            </div>
            <div className="table-responsive">
              <Table bordered hover style={{ borderRadius: "8px", overflow: "hidden" }}>
                <thead style={{ backgroundColor: "#f7f7f7", borderBottom: "2px solid #22b3a4" }}>
                  <tr>
                    <th style={{ textAlign: "center", fontWeight: "bold", fontSize: "1rem", color: "black" }}>
                      Nº DE REGISTRO
                    </th>
                    <th style={{ textAlign: "center", fontWeight: "bold", fontSize: "1rem", color: "black" }}>
                      NOMBRES Y APELLIDOS
                    </th>
                    <th style={{ textAlign: "center", fontWeight: "bold", fontSize: "1rem", color: "black" }}>
                      VER DOCUMENTOS
                    </th>
                    {/* Mostrar la columna "Editar" solo si el usuario es admin o superadmin */}
                    {(userRole === "admin" || userRole === "superadmin") && (
                      <th style={{ textAlign: "center", fontWeight: "bold", fontSize: "1rem", color: "black" }}>
                        EDITAR
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {listaStudents.map((student) => (
                    <tr key={student.id}>
                      <td style={{ textAlign: "center", padding: "0.75rem" }}>{student.nroRegistro}</td>
                      <td style={{ textAlign: "center", padding: "0.75rem" }}>{student.nombreCompleto}</td>
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
                          onClick={() => verDocumentos(student.id)}
                        >
                          Ver
                        </Button>
                      </td>
                      {(userRole === "admin" || userRole === "superadmin") && (
                        <td style={{ textAlign: "center", padding: "0.75rem" }}>
                          <Button
                            style={{
                              backgroundColor: "#f39c12", // Color amarillo para el botón de editar
                              borderColor: "#f39c12",
                              color: "#fff",
                              padding: "0.4rem 0.8rem",
                              fontSize: "0.8rem",
                              borderRadius: "5px",
                            }}
                            onClick={() => editarEstudiante(student.id)} // Redirige a la página de edición
                          >
                            Editar
                          </Button>
                        </td>
                      )}
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

export default StudentListPage;

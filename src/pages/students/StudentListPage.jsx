import React, { useEffect, useState } from "react";
import { Card, Container, Table, Button, Pagination } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getAuthToken } from "../../utilities/TokenUtilities";
import { useNavigate } from "react-router-dom";
import { getListaEstudiantes } from "../../services/EstudiantesService";
import Menu from "../../components/Menu";
import { DOCUMENT_STUDENT_URL } from "../../navigation/CONSTANTS";

const StudentListPage = () => {
  const navigate = useNavigate();
  const [listaStudents, setListaStudents] = useState([]);
  const [showAlertError, setShowAlertError] = useState(false);
  const [userRole, setUserRole] = useState(localStorage.getItem("rol"));
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(15);  // Puedes ajustar este valor según lo necesario
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

  const editarEstudiante = (id) => {
    navigate(`/students/edit/${id}`);
  };

  // Lógica para la paginación
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = listaStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Número total de páginas
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(listaStudents.length / studentsPerPage); i++) {
    pageNumbers.push(i);
  }

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
                    {(userRole === "admin" || userRole === "superadmin") && (
                      <th style={{ textAlign: "center", fontWeight: "bold", fontSize: "1rem", color: "black" }}>
                        EDITAR
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {currentStudents.map((student) => (
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
                            onClick={() => editarEstudiante(student.id)}
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
            {/* Paginación */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
              <Pagination>
                <Pagination.Prev onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)} />
                {pageNumbers.map((number) => (
                  <Pagination.Item
                    key={number}
                    active={number === currentPage}
                    onClick={() => paginate(number)}
                  >
                    {number}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() =>
                    setCurrentPage(currentPage < pageNumbers.length ? currentPage + 1 : currentPage)
                  }
                />
              </Pagination>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default StudentListPage;

import React, { useEffect, useState } from "react";
import { Card, Container, Table, Button, Pagination } from "react-bootstrap";
import { getAuthToken } from "../../utilities/TokenUtilities";
import Menu from "../../components/Menu";
import { getListaAuditorias } from "../../services/AuditoriaService";

const AuditoriaListPage = () => {
  const [listaLogs, setListaLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage] = useState(20); // Mostrar 20 logs por página

  useEffect(() => {
    loadAuditorias();
  }, []);

  const loadAuditorias = () => {
    getListaAuditorias(getAuthToken())
      .then((data) => {
        setListaLogs(data);
      })
      .catch((error) => {
        console.error("Error al cargar auditorías:", error);
      });
  };

  // Lógica para dividir los logs en páginas
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = listaLogs.slice(indexOfFirstLog, indexOfLastLog);

  // Función para cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(listaLogs.length / logsPerPage);

  return (
    <>
      <Menu />
      <Container>
        <Card style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: "8px", marginTop: "20px" }}>
          <Card.Body>
            <Card.Title style={{ textAlign: "center", fontSize: "1.5rem", color: "black", fontWeight: "bold" }}>
              Lista de acciones realizadas
            </Card.Title>
            <div className="table-responsive">
              <Table bordered hover style={{ borderRadius: "8px", overflow: "hidden" }}>
                <thead style={{ backgroundColor: "#f7f7f7", borderBottom: "2px solid #22b3a4" }}>
                  <tr>
                    <th style={{ textAlign: "center", fontWeight: "bold", fontSize: "1rem", color: "black" }}>ID</th>
                    <th style={{ textAlign: "center", fontWeight: "bold", fontSize: "1rem", color: "black" }}>Acción</th>
                    <th style={{ textAlign: "center", fontWeight: "bold", fontSize: "1rem", color: "black" }}>Tabla</th>
                    <th style={{ textAlign: "center", fontWeight: "bold", fontSize: "1rem", color: "black" }}>ID Registro</th>
                    <th style={{ textAlign: "center", fontWeight: "bold", fontSize: "1rem", color: "black" }}>Usuario</th>
                    <th style={{ textAlign: "center", fontWeight: "bold", fontSize: "1rem", color: "black" }}>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {currentLogs.map((log) => (
                    <tr key={log.id}>
                      <td style={{ textAlign: "center", padding: "0.75rem" }}>{log.id}</td>
                      <td style={{ textAlign: "center", padding: "0.75rem" }}>{log.accionRealizada}</td>
                      <td style={{ textAlign: "center", padding: "0.75rem" }}>{log.tablaAfectada}</td>
                      <td style={{ textAlign: "center", padding: "0.75rem" }}>{log.idRegistroAfectado}</td>
                      <td style={{ textAlign: "center", padding: "0.75rem" }}>{log.idUsuario}</td>
                      <td style={{ textAlign: "center", padding: "0.75rem" }}>
                        {new Date(log.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

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
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default AuditoriaListPage;

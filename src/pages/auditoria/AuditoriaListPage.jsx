import React, { useEffect, useState } from "react";
import { Card, Container, Table, Button } from "react-bootstrap";
import { getAuthToken } from "../../utilities/TokenUtilities";
import Menu from "../../components/Menu";
import { getListaAuditorias } from "../../services/AuditoriaService";

const AuditoriaListPage = () => {
  const [listaLogs, setListaLogs] = useState([]);

  useEffect(() => {
    loadAuditorias();
  }, []);

  const loadAuditorias = () => {
    getListaAuditorias(getAuthToken()).then((data) => {
      setListaLogs(data);
    }).catch((error) => {
      console.error("Error al cargar auditorías:", error);
    });
  };

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
                  {listaLogs.map((log) => (
                    <tr key={log.id}>
                      <td style={{ textAlign: "center", padding: "0.75rem" }}>{log.id}</td>
                      <td style={{ textAlign: "center", padding: "0.75rem" }}>{log.accionRealizada}</td>
                      <td style={{ textAlign: "center", padding: "0.75rem" }}>{log.tablaAfectada}</td>
                      <td style={{ textAlign: "center", padding: "0.75rem" }}>{log.idRegistroAfectado}</td>
                      <td style={{ textAlign: "center", padding: "0.75rem" }}>{log.idUsuario}</td>
                      <td style={{ textAlign: "center", padding: "0.75rem" }}>{new Date(log.created_at).toLocaleString()}</td>
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

export default AuditoriaListPage;

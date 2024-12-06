import React, { useEffect, useState } from "react";
import { Card, Container, Table, Button, Modal } from "react-bootstrap";
import { getDocumentosByStudent, deleteDocumento,patchUpdateDocumento } from "../../services/DocumentosService";
import { getAuthToken, getUserRole } from "../../utilities/TokenUtilities";
import Menu from "../../components/Menu";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../services/CONSTANTS";
import { Link } from "react-router-dom";

const DocumentosDelEstudiante = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const { id } = useParams();

  const userRole = getUserRole(); // Obtiene el rol del usuario

  const tipoDocumentoMap = {
    certificadoNacimiento: "Certificado de Nacimiento",
    tituloBachiller: "Título de Bachiller",
    carnetIdentidad: "Carnet de Identidad",
    certificadoEstudio: "Certificado de Estudio",
    otroDocumento: "Otro Documento",
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = () => {
    setLoading(true);
    getDocumentosByStudent(getAuthToken(), id)
      .then((data) => {
        if (Array.isArray(data)) {
          // Filtrar los documentos eliminados si el rol es 'user'
          const filteredDocuments = data.filter((doc) => {
            // Excluir documentos con estado 'eliminado' si el rol es 'user'
            if (userRole === "user" && doc.estado === "eliminado") {
              return false;
            }
            return true; // Mantener otros documentos
          });
          setDocuments(filteredDocuments);
        } else {
          setDocuments([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este documento?")) {
      deleteDocumento(getAuthToken(), id)
        .then(() => {
          alert("Documento eliminado con éxito");
          fetchDocuments();
        })
        .catch((err) => {
          console.error(err);
          alert("Hubo un error al eliminar el documento");
        });
    }
  };

  const handleViewDocument = (documentURL) => {
    const fullURL = `${BASE_URL}/STORAGE/${documentURL}`;
    setSelectedDocument(fullURL);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDocument(null);
  };

  const handleToggleArchive = (id, currentState) => {
    // Determinar el nuevo estado
    const newState = currentState === "archivado" ? "activo" : "archivado";
  
    if (window.confirm(`¿Estás seguro de ${newState === "archivado" ? "archivar" : "desarchivar"} este documento?`)) {
      const document = { estado: newState };
  
      patchUpdateDocumento(getAuthToken(), id, document)
        .then(() => {
          alert(`Documento ${newState === "archivado" ? "archivado" : "activado"} con éxito`);
          fetchDocuments(); // Recargar la lista actualizada
        })
        .catch((err) => {
          console.error(err);
          alert(`Hubo un error al ${newState === "archivado" ? "archivar" : "desarchivar"} el documento`);
        });
    }
  };
  

  return (
    <>
      <Menu />
      <Container>
        <Card className="shadow-lg mt-4" style={{ borderRadius: "12px", padding: "20px" }}>
          <Card.Body>
            <Card.Title className="text-center mb-4" style={{ color: "black", fontSize: "1.8rem", fontWeight: "bold" }}>
              DOCUMENTOS REGISTRADOS
            </Card.Title>

            {
              <div className="d-flex justify-content-end mb-3">
                <Link to={`/documents/create/${id}`}>
                  <Button
                    variant="success"
                    style={{
                      borderRadius: "8px",
                      padding: "8px 12px",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    Agregar Documento
                  </Button>
                </Link>
              </div>
            }

            <Table striped bordered hover responsive>
              <thead className="text-center">
                <tr>
                  <th>TIPO DE DOCUMENTO</th>
                  <th>ESTADO DEL DOCUMENTO</th>
                  <th>FECHA DE CREACION</th>
                  <th>VER</th>
                  <th>ELIMINAR</th>
                  <th>ARCHIVAR</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {loading ? (
                  <tr>
                    <td colSpan="5">Cargando documentos...</td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="5">Error al cargar documentos: {error.message}</td>
                  </tr>
                ) : documents.length === 0 ? (
                  <tr>
                    <td colSpan="5">No hay documentos disponibles.</td>
                  </tr>
                ) : (
                  documents.map((doc) => {
                    let showViewButton = false;
                    let showDeleteButton = false;

                    // Lógica según rol
                    switch (userRole) {
                      case "user":
                        if (doc.estado === "activo") {
                          showViewButton = true;
                        }
                        break;
                      case "admin":
                        if (doc.estado !== "eliminado") {
                          showViewButton = true;
                          showDeleteButton = true;
                        }
                        break;
                      case "superadmin":
                        showViewButton = true;
                        showDeleteButton = true;
                        break;
                      default:
                        break;
                    }

                    return (
                      <tr key={doc.id}>
                        <td>{tipoDocumentoMap[doc.tipo] || doc.tipo}</td>
                        <td>{doc.estado}</td>
                        <td>{new Date(doc.created_at).toLocaleDateString()}</td>
                        <td>
                          {showViewButton ? (
                            <Button
                              variant="info"
                              onClick={() => handleViewDocument(doc.documentoURL)}
                              style={{
                                backgroundColor: "#22b3a4",
                                borderColor: "#22b3a4",
                                borderRadius: "8px",
                                padding: "8px 12px",
                                fontSize: "0.9rem",
                                fontWeight: "bold",
                                color: "white",
                              }}
                            >
                              Ver
                            </Button>
                          ) : (
                            <span className="text-muted">No disponible</span>
                          )}
                        </td>
                        <td>
                          {userRole !== "admin" && showDeleteButton ? (
                            <Button
                              variant="danger"
                              onClick={() => handleDelete(doc.id)}
                              style={{
                                borderRadius: "8px",
                                padding: "8px 12px",
                                fontSize: "0.9rem",
                                fontWeight: "bold",
                              }}
                            >
                              Eliminar
                            </Button>
                          ) : (
                            <span className="text-muted">No disponible</span>
                          )}
                        </td>
                        <td>
                        {(userRole === "admin" || userRole === "superadmin") && (
                          <Button
                            variant={doc.estado === "archivado" ? "primary" : "warning"}
                            onClick={() => handleToggleArchive(doc.id, doc.estado)}
                            style={{
                              borderRadius: "8px",
                              padding: "8px 12px",
                              fontSize: "0.9rem",
                              fontWeight: "bold",
                            }}
                          >
                            {doc.estado === "archivado" ? "Desarchivar" : "Archivar"}
                          </Button>
                        )}
                        {userRole === "user" && <span className="text-muted">No disponible</span>}
                      </td>

                      </tr>
                    );
                  })
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Ver Documento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDocument ? (
            selectedDocument.endsWith(".pdf") ? (
              <iframe
                src={selectedDocument}
                width="100%"
                height="600px"
                title="Documento"
                frameBorder="0"
              />
            ) : (
              <img
                src={selectedDocument}
                alt="Documento"
                style={{ width: "100%", height: "auto" }}
              />
            )
          ) : (
            <p>No hay documento disponible para mostrar.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => window.print()}>
            Imprimir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DocumentosDelEstudiante;

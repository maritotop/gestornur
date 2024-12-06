import React, { useEffect, useState } from "react";
import { Card, Container, Table, Button, Modal, Pagination } from "react-bootstrap";
import { getListaDocumentos, deleteDocumento } from "../../services/DocumentosService";
import { getAuthToken } from "../../utilities/TokenUtilities";
import Menu from "../../components/Menu";
import { BASE_URL } from "../../services/CONSTANTS";

const DocumentoListPage = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); 
  const [selectedDocument, setSelectedDocument] = useState(null); 

  const [currentPage, setCurrentPage] = useState(1);
  const [documentsPerPage] = useState(20); // Número de documentos por página

  const tipoDocumentoMap = {
    certificadoNacimiento: 'Certificado de Nacimiento',
    tituloBachiller: 'Título de Bachiller',
    carnetIdentidad: 'Carnet de Identidad',
    certificadoEstudio: 'Certificado de Estudio',
    otroDocumento: 'Otro Documento',
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = () => {
    setLoading(true);
    getListaDocumentos(getAuthToken())
      .then((data) => {
        setDocuments(data);
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

  // Lógica de paginación
  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = documents.slice(indexOfFirstDocument, indexOfLastDocument);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(documents.length / documentsPerPage);

  return (
    <>
      <Menu />
      <Container>
        <Card style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: "8px", marginTop: "20px" }}>
          <Card.Body>
            <Card.Title style={{ textAlign: "center", fontSize: "1.5rem", color: "black", fontWeight: "bold" }}>
              Lista de Documentos
            </Card.Title>
            <Table striped bordered hover style={{ borderRadius: "8px", overflow: "hidden" }}>
              <thead style={{ backgroundColor: "#f7f7f7", borderBottom: "2px solid #22b3a4" }}>
                <tr>
                  <th className="text-center" style={{ fontWeight: "bold", fontSize: "1rem", color: "black" }}>ID</th>
                  <th className="text-center" style={{ fontWeight: "bold", fontSize: "1rem", color: "black" }}>TIPO</th>
                  <th className="text-center" style={{ fontWeight: "bold", fontSize: "1rem", color: "black" }}>ESTADO</th>
                  <th className="text-center" style={{ fontWeight: "bold", fontSize: "1rem", color: "black" }}>VER</th>
                  <th className="text-center" style={{ fontWeight: "bold", fontSize: "1rem", color: "black" }}>ELIMINAR</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center">Cargando documentos...</td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="5" className="text-center">Error al cargar documentos: {error.message}</td>
                  </tr>
                ) : currentDocuments.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">No hay documentos disponibles.</td>
                  </tr>
                ) : (
                  currentDocuments.map((doc) => (
                    <tr key={doc.id}>
                      <td className="text-center">{doc.id}</td>
                      <td className="text-center">{tipoDocumentoMap[doc.tipo] || doc.tipo}</td>
                      <td className="text-center">{doc.estado}</td>
                      <td className="text-center">
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
                          onClick={() => handleViewDocument(doc.documentoURL)}
                        >
                          <i className="bi bi-eye"></i> Ver
                        </Button>
                      </td>
                      <td className="text-center">
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(doc.id)}
                        >
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>

            {/* Paginación con el estilo usado en auditoría */}
            <div className="d-flex justify-content-center mt-3">
              <Pagination>
                <Pagination.Prev
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                />
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                  <Pagination.Item
                    key={pageNumber}
                    active={pageNumber === currentPage}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                />
              </Pagination>
            </div>
          </Card.Body>
        </Card>
      </Container>

      {/* Modal para ver el documento */}
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
          ) : null}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DocumentoListPage;

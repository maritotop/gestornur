import React, { useEffect, useState } from "react";
import { Card, Container, Table, Button, Modal } from "react-bootstrap";
import { getListaDocumentos, deleteDocumento } from "../../services/DocumentosService";
import { getAuthToken } from "../../utilities/TokenUtilities";
import Menu from "../../components/Menu";
import { BASE_URL } from "../../services/CONSTANTS";

const DocumentoListPage = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Para controlar la visibilidad del modal
  const [selectedDocument, setSelectedDocument] = useState(null); // El documento seleccionado

  // Mapeo de los tipos de documento
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
    setShowModal(true); // Mostrar el modal con el documento seleccionado
  };

  const handleCloseModal = () => {
    setShowModal(false); // Cerrar el modal
    setSelectedDocument(null); // Limpiar el documento seleccionado
  };

  return (
    <>
      <Menu />
      <Container>
        <Card>
          <Card.Body>
            {/* Aplicando clase text-center a Card.Title para centrar el texto */}
            <Card.Title className="text-center">Lista de Documentos</Card.Title>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="text-center">ID</th>
                  <th className="text-center">TIPO</th>
                  <th className="text-center">ESTADO</th>
                  <th className="text-center">VER</th> {/* Columna para ver */}
                  <th className="text-center">ELIMINAR</th> {/* Columna para eliminar */}
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
                ) : documents.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">No hay documentos disponibles.</td>
                  </tr>
                ) : (
                  documents.map((doc) => (
                    <tr key={doc.id}>
                      <td className="text-center">{doc.id}</td>
                      <td className="text-center">{tipoDocumentoMap[doc.tipo] || doc.tipo}</td> {/* Mapeo del tipo de documento */}
                      <td className="text-center">{doc.estado}</td>
                      <td className="text-center">
                      <Button
                        style={{
                          backgroundColor: "#22b3a4", // Color de fondo
                          borderColor: "#22b3a4", // Color del borde
                          color: "white", // Color del texto
                          fontWeight: "bold", // Negrita para el texto
                          borderRadius: "8px", // Bordes redondeados
                          padding: "8px 12px", // Espaciado interno
                          fontSize: "0.9rem", // Tamaño de fuente ajustado
                        }}
                        onClick={() => handleViewDocument(doc.documentoURL)} // Llamar al modal para ver el documento
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
                src={selectedDocument}  // URL completa del documento PDF
                width="100%"
                height="600px"
                title="Documento"
                frameBorder="0"
              />
            ) : (
              <img
                src={selectedDocument}  // URL completa del documento (imagen)
                alt="Documento"
                style={{ width: '100%', height: 'auto' }}
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

export default DocumentoListPage;

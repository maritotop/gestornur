import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import nurLogo from "../assets/images/nur-logo.png";
import { useState, useEffect } from "react";

const Menu = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("rol"));

  useEffect(() => {
    setRole(localStorage.getItem("rol"));
  }, [token]);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    setToken(null);
    navigate("/login");
  };

  const renderMenuOptions = () => {
    if (!token) return null;

    switch (role) {
      case "user":
      case "admin":
        return (
          <>
            <Dropdown className="custom-dropdown">
              <Dropdown.Toggle
                id="students-dropdown"
                variant="link"
                className="text-white"
              >
                Estudiantes
              </Dropdown.Toggle>
              <Dropdown.Menu className="custom-dropdown-menu">
                <Dropdown.Item as={Link} to="/students/search" className="custom-dropdown-item">
                  Buscar estudiante
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/students" className="custom-dropdown-item">
                  Lista de estudiantes
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/students/create" className="custom-dropdown-item">
                  Crear estudiante
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>
        );
      case "superadmin":
        return (
          <>
            <Dropdown className="custom-dropdown">
              <Dropdown.Toggle
                id="students-dropdown"
                variant="link"
                className="text-white"
              >
                Estudiantes
              </Dropdown.Toggle>
              <Dropdown.Menu className="custom-dropdown-menu">
                <Dropdown.Item as={Link} to="/students/search" className="custom-dropdown-item">
                  Buscar estudiante
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/students" className="custom-dropdown-item">
                  Lista de estudiantes
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/students/create" className="custom-dropdown-item">
                  Crear estudiante
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown className="custom-dropdown">
              <Dropdown.Toggle
                id="documents-dropdown"
                variant="link"
                className="text-white"
              >
                Documentos
              </Dropdown.Toggle>
              <Dropdown.Menu className="custom-dropdown-menu">
                <Dropdown.Item as={Link} to="/documents" className="custom-dropdown-item">
                  Todos los documentos
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown className="custom-dropdown">
              <Dropdown.Toggle
                id="audit-dropdown"
                variant="link"
                className="text-white"
              >
                Auditoría
              </Dropdown.Toggle>
              <Dropdown.Menu className="custom-dropdown-menu">
                <Dropdown.Item as={Link} to="/logs" className="custom-dropdown-item">
                  Lista de auditoría
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Nav.Link as={Link} to="/usuarios" className="text-white">
              Usuarios
            </Nav.Link>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Navbar
      expand="lg"
      style={{ backgroundColor: "#002855" }} // Azul institucional de la NUR
    >
      <Container fluid className="d-flex justify-content-between align-items-center">
        <Link
          to="/students/search" // Enlace al buscador de estudiantes
          className="d-flex align-items-center text-decoration-none"
        >
          <img
            src={nurLogo}
            alt="Logo NUR"
            style={{ height: "40px", marginRight: "10px" }}
          />
        </Link>

        <Navbar.Brand
          className="mx-auto" // Centra el texto
          style={{
            color: "#FFC72C",
            fontWeight: "bold",
            whiteSpace: "nowrap", // Evitar que el texto se rompa
          }}
        >
          Gestor de Archivos
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            {renderMenuOptions()}
            {token ? (
              <Nav.Link
                onClick={cerrarSesion}
                className="text-white ml-3"
                style={{ cursor: "pointer" }}
              >
                Cerrar sesión
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login" className="text-white">
                Iniciar sesión
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;

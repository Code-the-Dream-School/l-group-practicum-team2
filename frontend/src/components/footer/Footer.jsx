import { Container } from "react-bootstrap";
import { Github } from "react-bootstrap-icons";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{ backgroundColor: "#f8f9fa", borderTop: "1px solid #dee2e6" }}
    >
      <Container className="px-3 py-4 d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
        <span className="text-muted">
          &copy; {currentYear} <strong>PawMatch</strong> &mdash; Helping every
          pet find a home
        </span>

        <span className="text-muted">Made with love by I-Group-Team2</span>

        <a
          href="https://github.com/Code-the-Dream-School/l-group-practicum-team2"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted d-flex align-items-center gap-2"
          style={{ textDecoration: "none" }}
        >
          <Github size={20} />
          <span>GitHub</span>
        </a>
      </Container>
    </footer>
  );
};

export default Footer;

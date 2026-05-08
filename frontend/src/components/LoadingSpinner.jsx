import Spinner from "react-bootstrap/Spinner";

export default function LoadingSpinner({ message }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "2rem",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <p style={{ margin: "2rem auto" }}>{message}</p>
    </div>
  );
}

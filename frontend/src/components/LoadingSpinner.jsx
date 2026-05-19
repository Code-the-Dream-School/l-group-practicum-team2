import PropTypes from "prop-types";
import Spinner from "react-bootstrap/Spinner";

export default function LoadingSpinner({ message }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "4rem",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Spinner animation="border" role="status" />
      <p style={{ margin: "2rem auto" }}>{message}</p>
    </div>
  );
}
LoadingSpinner.propTypes = {
  message: PropTypes.string.isRequired,
};
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const EmailInputBox = ({ email, setEmail, emailError, setEmailError }) => {
  const handleChange = (e) => {
    setEmail(e.target.value);
    if (emailError) validateEmail(e.target.value);
  };
  const validateEmail = (email) => {
    const re = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

    if (email === "") setEmailError("Email is required");
    else if (!re.test(email)) setEmailError("Email format is invalid");
    else setEmailError("");
  };
  return (
    <>
      <Form.Control
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleChange}
        onBlur={(e) => validateEmail(e.target.value)}
      />

      {emailError && <p className="text-danger">{emailError}.</p>}
    </>
  );
};
EmailInputBox.propTypes = {
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  emailError: PropTypes.string.isRequired,
  setEmailError: PropTypes.func.isRequired,
};
export default EmailInputBox;

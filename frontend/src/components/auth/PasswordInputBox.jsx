import { Form } from "react-bootstrap";
import { useState } from "react";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import PropTypes from "prop-types";

const PasswordInputBox = ({
  password,
  setPassword,
  passwordError,
  setPasswordError,
}) => {
  const [showPassword, toggleShowPassword] = useState(false);

  const handleChange = (e) => {
    setPassword(e.target.value);
    if (passwordError) validatePassword(e.target.value);
  };
  const validatePassword = (pa) => {
    const re = /^[A-Za-z0-9]{6,30}$/;
    if (pa === "") setPasswordError("Password is required");
    else if (!re.test(pa)) {
      setPasswordError(
        "Password must be between 6 and 30 characters and contain only letters and numbers."
      );
    } else setPasswordError("");
  };
  return (
    <>
      <div
        style={{
          position: "relative",
        }}
      >
        <Form.Control
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          maxLength={20}
          value={password}
          onChange={handleChange}
          onBlur={(e) => validatePassword(e.target.value)}
        />
        <button
          type="button"
          aria-label={showPassword ? "Hide password" : "Show password"}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            position: "absolute",
            right: 0,
            top: 0,
            height: "100%",
            aspectRatio: "1/1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => toggleShowPassword(!showPassword)}
        >
          {showPassword ? <EyeSlash /> : <Eye />}
        </button>
      </div>

      {passwordError && <p className="text-danger">{passwordError}.</p>}
    </>
  );
};
PasswordInputBox.propTypes = {
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  passwordError: PropTypes.string.isRequired,
  setPasswordError: PropTypes.func.isRequired,
};
export default PasswordInputBox;

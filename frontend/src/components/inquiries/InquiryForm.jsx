import { useState } from "react";
import PropTypes from "prop-types";
import { Spinner } from "react-bootstrap";

const MIN_MESSAGE_LENGTH = 10;

function InquiryForm({ animalId, requestAddInquiry, onHide, isSubmitting }) {
  const [message, setMessage] = useState("");
  const [validationError, setValidationError] = useState(null);

  const validate = (value) => {
    const trimmed = value.trim();
    if (trimmed.length === 0) {
      return "Message is required.";
    }
    if (trimmed.length < MIN_MESSAGE_LENGTH) {
      return `Message must be at least ${MIN_MESSAGE_LENGTH} characters.`;
    }
    return null;
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    if (validationError) {
      setValidationError(validate(e.target.value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationMessage = validate(message);
    if (validationMessage) {
      setValidationError(validationMessage);
      return;
    }

    const success = await requestAddInquiry({
      animalId,
      message: message.trim(),
    });
    if (success) onHide();
  };

  return (
    <form className="inquiry-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="inquiry-message" className="inquiry-form-label">
        Your message to the shelter
      </label>

      <textarea
        id="inquiry-message"
        className="inquiry-form-textarea"
        value={message}
        onChange={handleChange}
        placeholder="Tell the shelter why you're interested and a bit about your home..."
        rows={5}
        minLength={MIN_MESSAGE_LENGTH}
        required
        disabled={isSubmitting}
        aria-invalid={Boolean(validationError)}
        aria-describedby="inquiry-help"
      />

      <small id="inquiry-help" className="inquiry-form-hint">
        Minimum {MIN_MESSAGE_LENGTH} characters. {message.trim().length}/
        {MIN_MESSAGE_LENGTH}+
      </small>

      {validationError && (
        <p className="inquiry-form-error" role="alert">
          {validationError}
        </p>
      )}

      <div className="inquiry-form-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onHide}
          disabled={isSubmitting}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Spinner animation="border" size="sm" />
          ) : (
            "Send Inquiry"
          )}
        </button>
      </div>
    </form>
  );
}

InquiryForm.propTypes = {
  animalId: PropTypes.string.isRequired,
  requestAddInquiry: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

export default InquiryForm;

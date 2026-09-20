function ErrorMessage({ message }) {
  if (!message) {
    return null;
  }

  return (
    <div
      className="error-message"
      role="alert"
    >
      <span className="error-icon">
        !
      </span>

      <div>
        <strong>Unable to generate speech</strong>

        <p>{message}</p>
      </div>
    </div>
  );
}

export default ErrorMessage;
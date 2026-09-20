function TextInput({
  text,
  onTextChange,
  onClear,
  maxCharacters,
  wordCount,
  error,
}) {
  const isNearLimit = text.length >= maxCharacters * 0.9;
  const isAtLimit = text.length >= maxCharacters;

  return (
    <section className="section">
      <div className="section-header">
        <div>
          <h2>Enter your text</h2>

          <p>
            Type or paste the text you want to convert into speech.
          </p>
        </div>

        <button
          type="button"
          className="clear-button"
          onClick={onClear}
          disabled={!text}
        >
          Clear
        </button>
      </div>

      <textarea
        value={text}
        onChange={onTextChange}
        placeholder="Hello! Welcome to the Text-to-Speech application."
        className={`text-area ${error ? "text-area-error" : ""}`}
        maxLength={maxCharacters}
        aria-invalid={Boolean(error)}
        aria-describedby="text-validation-message"
      />

      <div className="text-information">
        <span
          className={
            isAtLimit
              ? "character-limit-danger"
              : isNearLimit
              ? "character-limit-warning"
              : ""
          }
        >
          Characters:{" "}
          <strong>
            {text.length.toLocaleString()}
          </strong>
          {" / "}
          {maxCharacters.toLocaleString()}
        </span>

        <span>
          Words: <strong>{wordCount}</strong>
        </span>
      </div>

      {error && (
        <p
          id="text-validation-message"
          className="field-error"
        >
          {error}
        </p>
      )}
    </section>
  );
}

export default TextInput;
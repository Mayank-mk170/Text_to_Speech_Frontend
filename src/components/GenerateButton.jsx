function GenerateButton({
  loading,
  onGenerate,
}) {
  return (
    <section className="generate-section">
      <button
        type="button"
        className="generate-button"
        onClick={onGenerate}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="spinner"></span>
            Generating...
          </>
        ) : (
          <>
            <span>▶</span>
            Generate Speech
          </>
        )}
      </button>
    </section>
  );
}

export default GenerateButton;
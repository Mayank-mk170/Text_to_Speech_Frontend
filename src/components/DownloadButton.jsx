function DownloadButton({
  audioUrl,
  onDownload,
  loading = false,
}) {
  if (!audioUrl) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={onDownload}
      disabled={loading}
      style={{
        width: "200px",
        height: "48px",

        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",

        border: "none",
        borderRadius: "24px",

        backgroundColor: "#2563eb",
        color: "#ffffff",

        fontFamily: "inherit",
        fontSize: "15px",
        fontWeight: "600",

        cursor: loading
          ? "not-allowed"
          : "pointer",

        opacity: loading ? 0.7 : 1,
        whiteSpace: "nowrap",
      }}
    >
      {loading
        ? "Preparing..."
        : "↓ Download Audio"}
    </button>
  );
}

export default DownloadButton;
function VoiceSelector({
  voices,
  selectedVoice,
  onVoiceChange,
  loading = false,
}) {
  return (
    <div className="form-group">

      <label htmlFor="voice">
        Voice
      </label>

      <select
        id="voice"
        value={selectedVoice}
        onChange={onVoiceChange}
        className="select-input"
        disabled={loading || voices.length === 0}
      >
        {loading ? (
          <option value="">
            Loading voices...
          </option>
        ) : voices.length === 0 ? (
          <option value="">
            No voices available
          </option>
        ) : (
          voices.map((voice) => (
            <option
              key={voice.value}
              value={voice.value}
            >
              {voice.label}
            </option>
          ))
        )}
      </select>

    </div>
  );
}

export default VoiceSelector;
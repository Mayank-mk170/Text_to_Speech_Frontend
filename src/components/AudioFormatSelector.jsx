function AudioFormatSelector({
  selectedFormat,
  onFormatChange,
}) {
  return (
    <div className="download-format-wrapper">

      <label htmlFor="audioFormat">
        Audio Format
      </label>

      <select
        id="audioFormat"
        value={selectedFormat}
        onChange={onFormatChange}
        className="download-format-select"
      >
        <option value="mp3">MP3</option>
        <option value="wav">WAV</option>
        <option value="ogg">OGG</option>
      </select>

    </div>
  );
}

export default AudioFormatSelector;
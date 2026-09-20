function LanguageSelector({
  languages,
  selectedLanguage,
  onLanguageChange,
}) {
  return (
    <div className="form-group">
      <label htmlFor="language">
        Language
      </label>

      <select
        id="language"
        value={selectedLanguage}
        onChange={onLanguageChange}
        className="select-input"
      >
        {languages.map((language) => (
          <option
            key={language.value}
            value={language.value}
          >
            {language.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSelector;
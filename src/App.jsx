import { useEffect, useState } from "react";

import TextInput from "./components/TextInput";
import LanguageSelector from "./components/LanguageSelector";
import VoiceSelector from "./components/VoiceSelector";
import GenerateButton from "./components/GenerateButton";
import AudioPlayer from "./components/AudioPlayer";
import DownloadButton from "./components/DownloadButton";
import ErrorMessage from "./components/ErrorMessage";

import {
  checkBackendHealth,
  generateSpeech,
} from "./services/api";

function App() {
  // ==========================================
  // STATE
  // ==========================================

  const [text, setText] = useState("");

  const [language, setLanguage] = useState("en-IN");

  const [voice, setVoice] = useState("shubh");

  // Download format only
  const [downloadFormat, setDownloadFormat] =
    useState("mp3");

  // Generated MP3 used by the audio player
  const [audioUrl, setAudioUrl] = useState(null);

  // Stores the request used to generate audio
  const [generatedSpeech, setGeneratedSpeech] =
    useState(null);

  const [loading, setLoading] = useState(false);

  const [downloading, setDownloading] =
    useState(false);

  const [textError, setTextError] = useState("");

  const [error, setError] = useState("");

  const [backendStatus, setBackendStatus] =
    useState("Checking...");

  const MAX_CHARACTERS = 500;

  // ==========================================
  // LANGUAGES + VOICES
  // ==========================================

  const languages = [
    {
      value: "en-IN",
      label: "English",
      provider: "Sarvam",
      voices: [
        {
          value: "shubh",
          label: "Male",
        },
        {
          value: "priya",
          label: "Female",
        },
      ],
    },

    {
      value: "hi-IN",
      label: "Hindi",
      provider: "Sarvam",
      voices: [
        {
          value: "shubh",
          label: "Male",
        },
        {
          value: "priya",
          label: "Female",
        },
      ],
    },

    {
      value: "gu-IN",
      label: "Gujarati",
      provider: "Sarvam",
      voices: [
        {
          value: "ratan",
          label: "Male",
        },
        {
          value: "priya",
          label: "Female",
        },
      ],
    },

    {
      value: "mr-IN",
      label: "Marathi",
      provider: "Sarvam",
      voices: [
        {
          value: "ratan",
          label: "Male",
        },
        {
          value: "priya",
          label: "Female",
        },
      ],
    },

    {
      value: "es",
      label: "Spanish",
      provider: "Deepgram",
      voices: [
        {
          value: "aura-2-celeste-es",
          label: "Female",
        },
        {
          value: "aura-2-javier-es",
          label: "Male",
        },
      ],
    },

    {
      value: "fr",
      label: "French",
      provider: "Deepgram",
      voices: [
        {
          value: "aura-2-agathe-fr",
          label: "Female",
        },
        {
          value: "aura-2-hector-fr",
          label: "Male",
        },
      ],
    },

    {
      value: "de",
      label: "German",
      provider: "Deepgram",
      voices: [
        {
          value: "aura-2-julius-de",
          label: "Male",
        },
        {
          value: "aura-2-viktoria-de",
          label: "Female",
        },
      ],
    },
  ];

  // ==========================================
  // SELECTED LANGUAGE DATA
  // ==========================================

  const selectedLanguageData =
    languages.find(
      (item) => item.value === language
    );

  const voices =
    selectedLanguageData?.voices || [];

  // ==========================================
  // BACKEND HEALTH CHECK
  // ==========================================

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const result =
          await checkBackendHealth();

        console.log(
          "Backend response:",
          result
        );

        setBackendStatus("Connected");
      } catch (error) {
        console.error(
          "Backend health check failed:",
          error
        );

        setBackendStatus("Disconnected");
      }
    };

    checkBackend();
  }, []);

  // ==========================================
  // WORD COUNT
  // ==========================================

  const wordCount = text.trim()
    ? text.trim().split(/\s+/).length
    : 0;

  // ==========================================
  // TEXT CHANGE
  // ==========================================

  const handleTextChange = (event) => {
    const value = event.target.value;

    if (value.length > MAX_CHARACTERS) {
      setTextError(
        `Text cannot exceed ${MAX_CHARACTERS} characters.`
      );

      return;
    }

    setText(value);

    setTextError("");
    setError("");

    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }

    setAudioUrl(null);
    setGeneratedSpeech(null);
  };

  // ==========================================
  // LANGUAGE CHANGE
  // ==========================================

  const handleLanguageChange = (event) => {
    const newLanguage =
      event.target.value;

    const languageData =
      languages.find(
        (item) =>
          item.value === newLanguage
      );

    if (!languageData) {
      return;
    }

    setLanguage(newLanguage);

    // Select the first voice automatically
    setVoice(
      languageData.voices[0]?.value || ""
    );

    setTextError("");
    setError("");

    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }

    setAudioUrl(null);
    setGeneratedSpeech(null);
  };

  // ==========================================
  // VOICE CHANGE
  // ==========================================

  const handleVoiceChange = (event) => {
    const selectedVoice =
      event.target.value;

    const voiceExists =
      voices.some(
        (item) =>
          item.value === selectedVoice
      );

    if (!voiceExists) {
      setError(
        "The selected voice is not available for this language."
      );

      return;
    }

    setVoice(selectedVoice);

    setError("");

    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }

    setAudioUrl(null);
    setGeneratedSpeech(null);
  };

  // ==========================================
  // DOWNLOAD FORMAT CHANGE
  // ==========================================

  const handleDownloadFormatChange = (
    event
  ) => {
    const newFormat =
      event.target.value;

    setDownloadFormat(newFormat);

    setError("");
  };

  // ==========================================
  // GENERATE SPEECH
  // ==========================================

  const handleGenerateSpeech =
    async () => {
      setError("");

      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }

      setAudioUrl(null);
      setGeneratedSpeech(null);

      // ----------------------------------------
      // TEXT VALIDATION
      // ----------------------------------------

      if (!text.trim()) {
        setTextError(
          "Please enter some text first."
        );

        return;
      }

      if (text.trim().length < 2) {
        setTextError(
          "Please enter at least 2 characters."
        );

        return;
      }

      if (text.length > MAX_CHARACTERS) {
        setTextError(
          `Text cannot exceed ${MAX_CHARACTERS} characters.`
        );

        return;
      }

      // ----------------------------------------
      // LANGUAGE VALIDATION
      // ----------------------------------------

      if (!selectedLanguageData) {
        setError(
          "Please select a valid language."
        );

        return;
      }

      // ----------------------------------------
      // VOICE VALIDATION
      // ----------------------------------------

      const selectedVoice =
        selectedLanguageData.voices.find(
          (item) =>
            item.value === voice
        );

      if (!selectedVoice) {
        setError(
          "Please select a valid voice."
        );

        return;
      }

      // ----------------------------------------
      // START GENERATION
      // ----------------------------------------

      setTextError("");
      setError("");
      setLoading(true);

      try {
        console.log(
          "Generating playback audio:",
          {
            text,
            language,
            voice,
            format: "mp3",
            provider:
              selectedLanguageData.provider,
          }
        );

        // Always generate MP3 for playback
        const audioBlob =
          await generateSpeech({
            text,
            language,
            voice,
            format: "mp3",
          });

        if (!audioBlob) {
          throw new Error(
            "No audio returned from backend."
          );
        }

        if (audioBlob.size === 0) {
          throw new Error(
            "Received empty audio."
          );
        }

        // Create browser playback URL
        const generatedUrl =
          URL.createObjectURL(
            audioBlob
          );

        setAudioUrl(generatedUrl);

        // Remember request for downloading
        // another format later
        setGeneratedSpeech({
          text,
          language,
          voice,
        });

        console.log(
          "Speech generated successfully."
        );

      } catch (error) {
        console.error(
          "TTS request failed:",
          error
        );

        const status =
          error.response?.status;

        if (status === 400) {
          setError(
            "Invalid TTS request. Please check the selected language and voice."
          );
        } else if (status === 401) {
          setError(
            "TTS provider authentication failed. Please check the API key configured in the backend."
          );
        } else if (status === 403) {
          setError(
            "The TTS provider rejected the request."
          );
        } else if (status === 404) {
          setError(
            "TTS service endpoint was not found."
          );
        } else if (status === 429) {
          setError(
            "TTS provider rate limit reached. Please try again later."
          );
        } else {
          setError(
            "Unable to generate speech. Please try again."
          );
        }

      } finally {
        setLoading(false);
      }
    };

  // ==========================================
  // DOWNLOAD SELECTED FORMAT
  // ==========================================

  const handleDownload = async () => {
    if (!generatedSpeech) {
      return;
    }

    setDownloading(true);
    setError("");

    try {
      console.log(
        "Downloading audio:",
        {
          ...generatedSpeech,
          format: downloadFormat,
        }
      );

      const audioBlob =
        await generateSpeech({
          text: generatedSpeech.text,
          language:
            generatedSpeech.language,
          voice: generatedSpeech.voice,
          format: downloadFormat,
        });

      if (!audioBlob) {
        throw new Error(
          "No audio returned."
        );
      }

      if (audioBlob.size === 0) {
        throw new Error(
          "Downloaded audio is empty."
        );
      }

      // Create download URL
      const downloadUrl =
        URL.createObjectURL(
          audioBlob
        );

      const link =
        document.createElement("a");

      link.href = downloadUrl;

      link.download =
        `generated-speech.${downloadFormat}`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      // Clean up
      setTimeout(() => {
        URL.revokeObjectURL(
          downloadUrl
        );
      }, 1000);

    } catch (error) {
      console.error(
        "Audio download failed:",
        error
      );

      setError(
        `Unable to download ${downloadFormat.toUpperCase()} audio.`
      );

    } finally {
      setDownloading(false);
    }
  };

  // ==========================================
  // CLEAR
  // ==========================================

  const handleClear = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }

    setText("");
    setTextError("");
    setError("");
    setAudioUrl(null);
    setGeneratedSpeech(null);
    setLoading(false);
    setDownloading(false);
    setDownloadFormat("mp3");
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="app">

      <div className="container">

        {/* ================================== */}
        {/* HEADER */}
        {/* ================================== */}

        <header className="header">

          <div className="logo">

            <div className="logo-icon">
              🔊
            </div>

            <div>

              <h1>
                Text to Speech
              </h1>

              <p>
                Convert your text into
                natural-sounding speech
              </p>

              <div className="backend-status">

                <span
                  className={
                    backendStatus ===
                    "Connected"
                      ? "status-dot connected"
                      : backendStatus ===
                        "Disconnected"
                      ? "status-dot disconnected"
                      : "status-dot checking"
                  }
                ></span>

                Backend:{" "}
                {backendStatus}

              </div>

            </div>

          </div>

        </header>

        {/* ================================== */}
        {/* MAIN CARD */}
        {/* ================================== */}

        <main className="card">

          {/* TEXT */}

          <TextInput
            text={text}
            onTextChange={
              handleTextChange
            }
            onClear={handleClear}
            maxCharacters={
              MAX_CHARACTERS
            }
            wordCount={
              wordCount
            }
            error={
              textError
            }
          />

          {/* ==================================
              LANGUAGE + VOICE
              ================================== */}

          <section className="section">

            <div className="form-grid">

              <LanguageSelector
                languages={
                  languages
                }
                selectedLanguage={
                  language
                }
                onLanguageChange={
                  handleLanguageChange
                }
              />

              <VoiceSelector
                voices={
                  voices
                }
                selectedVoice={
                  voice
                }
                onVoiceChange={
                  handleVoiceChange
                }
              />

            </div>

          </section>

          {/* ==================================
              GENERATE BUTTON
              ================================== */}

          <GenerateButton
            loading={
              loading
            }
            onGenerate={
              handleGenerateSpeech
            }
          />

          {/* ==================================
              ERROR
              ================================== */}

          <ErrorMessage
            message={
              error
            }
          />

          {/* ==================================
              GENERATED AUDIO
              ================================== */}

          {audioUrl && (
            <section className="audio-section">

              <div className="audio-header">

                <h2>
                  Generated Audio
                </h2>

                <span>
                  MP3 • Ready to play
                </span>

              </div>

              {/* AUDIO PLAYER */}

              <AudioPlayer
                audioUrl={
                  audioUrl
                }
              />

              {/* ==================================
                  DOWNLOAD CONTROLS
                  ================================== */}

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "16px",
                  marginTop: "20px",
                  flexWrap: "nowrap",
                }}
              >

                {/* AUDIO FORMAT LABEL */}

                <span
                  style={{
                    color: "#1f2937",
                    fontSize: "15px",
                    fontWeight: "600",
                    whiteSpace:
                      "nowrap",
                  }}
                >
                  Audio Format
                </span>

                {/* AUDIO FORMAT SELECT */}

                <select
                  id="audioFormat"
                  value={
                    downloadFormat
                  }
                  onChange={
                    handleDownloadFormatChange
                  }
                  style={{
                    width: "150px",
                    height: "48px",
                    boxSizing:
                      "border-box",

                    padding:
                      "0 12px",

                    border:
                      "2px solid #d1d5db",
                    borderRadius:
                      "10px",

                    backgroundColor:
                      "#ffffff",

                    color:
                      "#111827",

                    fontFamily:
                      "inherit",

                    fontSize:
                      "15px",

                    outline:
                      "none",

                    cursor:
                      "pointer",
                  }}
                >

                  <option value="mp3">
                    MP3
                  </option>

                  <option value="wav">
                    WAV
                  </option>

                  <option value="ogg">
                    OGG
                  </option>

                </select>

                {/* DOWNLOAD BUTTON */}

                <DownloadButton
                  audioUrl={
                    audioUrl
                  }
                  onDownload={
                    handleDownload
                  }
                  loading={
                    downloading
                  }
                />

              </div>

            </section>
          )}

        </main>

        {/* ==================================
            FOOTER
            ================================== */}

        <footer>

          <p>
            Text-to-Speech Application
          </p>

        </footer>

      </div>

    </div>
  );
}

export default App;
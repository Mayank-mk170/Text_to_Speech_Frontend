import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// ==========================================
// BACKEND HEALTH
// ==========================================

export const checkBackendHealth = async () => {
  const response = await api.get("/api/health");

  return response.data;
};

// ==========================================
// VOICES
// ==========================================

export const getVoices = async () => {
  const response = await api.get("/api/voices");

  return response.data;
};

// ==========================================
// TRANSLATION
// ==========================================

export const translateText = async ({
  text,
  sourceLanguage,
  targetLanguage,
}) => {
  const response = await api.post("/api/translate", {
    text,
    sourceLanguage,
    targetLanguage,
  });

  return response.data;
};

// ==========================================
// TEXT TO SPEECH
// ==========================================

export const generateSpeech = async ({
  text,
  language,
  voice,
   format,
}) => {
  const response = await api.post(
    "/api/tts",
    {
      text,
      language,
      voice,
       format,
    },
    {
      responseType: "blob",
    }
  );

  return response.data;
};

export default api;
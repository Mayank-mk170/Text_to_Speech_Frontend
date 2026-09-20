import axios from "axios";

const api = axios.create({
  baseURL: "https://texttospeechbackend-production.up.railway.app",
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
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "blob",
    }
  );

  return response.data;
};

export default api;
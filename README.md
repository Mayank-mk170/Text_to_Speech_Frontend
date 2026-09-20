Text-to-Speech Frontend

A React + Vite web application that converts written text into speech through a Spring Boot backend.

Overview

The frontend lets users enter text, view character/word information, select a language and voice, generate speech, play the generated audio, choose a download format, download the audio, clear/modify text, and see validation/API/network errors.

Supported application languages:

English

Hindi

Gujarati

Marathi

Spanish

French

German

Tech Stack

React.js

Vite

JavaScript

Axios

HTML5

CSS3

Application Flow

User
  |
  v
React + Vite Frontend
  |
  | HTTP / REST API
  v
Spring Boot Backend
  |
  | TTS API Request
  v
Text-to-Speech Provider
  |
  | Audio Response
  v
Spring Boot Backend
  |
  v
React Audio Player / Download

Project Structure

Text_to_Speech_Frontend/
├── src/
│   ├── components/
│   │   ├── AudioPlayer.jsx
│   │   ├── DownloadButton.jsx
│   │   ├── ErrorMessage.jsx
│   │   ├── GenerateButton.jsx
│   │   ├── LanguageSelector.jsx
│   │   ├── TextInput.jsx
│   │   └── VoiceSelector.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   └── main.jsx
├── public/
├── package.json
├── vite.config.js
└── README.md

Components

TextInput

Handles text input, character count, word count, maximum-length validation, and clearing.

LanguageSelector

Allows the user to choose the speech language.

VoiceSelector

Allows the user to choose an available voice for the selected language.

GenerateButton

Sends the generation request to the backend and shows a loading state.

AudioPlayer

Provides browser audio controls for play, pause, seek, and volume.

DownloadButton

Downloads generated speech after the user selects the required download format.

ErrorMessage

Displays validation, API, and network errors.

Backend API

The frontend communicates with the Spring Boot backend:

GET  /api/health
GET  /api/voices
POST /api/tts

Example TTS request:

{
  "text": "Hello, welcome to my Text-to-Speech application.",
  "language": "en-IN",
  "voice": "female",
  "format": "mp3"
}

The TTS endpoint returns generated audio as a binary response.

Local Setup

1. Clone

git clone https://github.com/Mayank-mk170/Text_to_Speech_Frontend.git
cd Text_to_Speech_Frontend

2. Install dependencies

npm install

3. Run the frontend

npm run dev

Development URL:

http://localhost:5173

The Spring Boot backend should normally be available at:

http://localhost:8080

Features

Text input and validation

Character and word information

Seven language options

Voice selection

Backend speech generation

Loading state

Audio playback

Pause/resume

Seeking

Volume control

MP3, WAV, and OGG download selection

Download generated speech

Clear and modify input

Error handling

Backend connectivity status

Download Behavior

Speech is generated for playback and the download format can be selected separately. Changing the download format does not remove the currently generated playback audio.

Supported download formats:

MP3
WAV
OGG

Security

Provider API keys are kept on the backend and are not included in React source code. The frontend only calls the application's backend API.

Production Build

npm run build

Production output:

dist/

Preview the build:

npm run preview

Testing Checklist

Text input

Empty input validation

Long input validation

Language selection

Voice selection

Generate speech

Loading state

Audio playback

Pause/resume

Seeking

Volume control

MP3/WAV/OGG download

Clear input

API/network error handling

Repository

https://github.com/Mayank-mk170/Text_to_Speech_Frontend

Related Backend

https://github.com/Mayank-mk170/Text_to_Speech_Backend

License

Educational/project demonstration use.
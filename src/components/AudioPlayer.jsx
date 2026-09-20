function AudioPlayer({ audioUrl }) {
  if (!audioUrl) {
    return null;
  }

  return (
    <div className="audio-player-container">
      <audio
        className="audio-player"
        src={audioUrl}
        controls
        preload="metadata"
      >
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default AudioPlayer;
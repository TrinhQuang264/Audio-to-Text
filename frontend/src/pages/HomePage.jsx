import { useRef, useState } from "react";
import UploadForm from "../components/UploadForm";
import AudioPlayer from "../components/AudioPlayer";
import ResultTabs from "../components/ResultTabs";
import { useTranscribe } from "../hooks/useTranscribe";

export default function HomePage() {
  const { loading, progress, result, segments, error, transcribe } = useTranscribe();
  const [fileURL, setFileURL] = useState(null);
  const audioRef = useRef(null);

  const handleFileSubmit = (file) => {
    if (!file) return;
    setFileURL(URL.createObjectURL(file));
    transcribe(file);
  };

  const playSegment = (start) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = start;
    audioRef.current.play();
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Audio → Text (Local)</h1>
      </header>

      <main className="main">
        <UploadForm onSubmit={handleFileSubmit} loading={loading} progress={progress} />
        {error && <p className="error">{error}</p>}
        {fileURL && <AudioPlayer ref={audioRef} src={fileURL} />}
        {(segments.length > 0 || result) && (
          <ResultTabs result={result} segments={segments} onPlaySegment={playSegment} />
        )}
      </main>
    </div>
  );
}

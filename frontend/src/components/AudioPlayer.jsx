import { forwardRef } from "react";

const AudioPlayer = forwardRef(({ src }, ref) => (
  <div className="player">
    <h3>Nghe lại file gốc</h3>
    <audio ref={ref} src={src} controls />
  </div>
));

export default AudioPlayer;

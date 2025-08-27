export default function SegmentList({ segments, onPlaySegment }) {
  if (!segments || segments.length === 0) return null;

  return (
    <details>
      <summary>Xem theo đoạn</summary>
      <ul>
        {segments.map((s, i) => (
          <li key={i}>
            <span>
              [{s.start}s] {s.text}
            </span>
            <button onClick={() => onPlaySegment(s.start)} className="play-btn">
              ▶ Play
            </button>
          </li>
        ))}
      </ul>
    </details>
  );
}

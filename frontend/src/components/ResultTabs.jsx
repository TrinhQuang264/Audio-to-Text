import { useState } from "react";
import SegmentList from "./SegmentList";

export default function ResultTabs({ result, segments, onPlaySegment }) {
  const [activeTab, setActiveTab] = useState("segments");

  return (
    <div className="result-tabs">
      <div className="tab-buttons">
        <button
          className={activeTab === "segments" ? "active" : ""}
          onClick={() => setActiveTab("segments")}
        >
          Segment
        </button>
        <button
          className={activeTab === "text" ? "active" : ""}
          onClick={() => setActiveTab("text")}
        >
          Full Text
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "segments" && <SegmentList segments={segments} onPlaySegment={onPlaySegment} />}
        {activeTab === "text" && <textarea readOnly value={result} placeholder="Văn bản sẽ hiện ở đây..." />}
      </div>
    </div>
  );
}
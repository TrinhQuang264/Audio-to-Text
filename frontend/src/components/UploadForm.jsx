import { useState } from "react";

export default function UploadForm({ onSubmit, loading, progress }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(file);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label>Chọn file audio</label>
        <input type="file" accept="audio/*" onChange={handleFileChange} disabled={loading} />
      </div>
      <div className="form-actions">
        <button type="submit" disabled={!file || loading}>
          {loading ? `Đang chuyển đổi...` : "Chuyển đổi"}
        </button>
      </div>
      {loading && (
        <div className="progress">
          <div className="bar" style={{ width: `${progress}%` }}></div>
        </div>
      )}
    </form>
  );
}

import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export const useTranscribe = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState("");
  const [segments, setSegments] = useState([]);
  const [error, setError] = useState("");

  const transcribe = async (file) => {
    if (!file) {
      setError("Hãy chọn file audio trước.");
      return;
    }
    setLoading(true);
    setError("");
    setResult("");
    setSegments([]);
    setProgress(0);

    const formData = new FormData();
    formData.append("audio", file);

    try {
      const res = await axios.post(`${API_URL}/api/transcribe/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (evt) => {
          if (evt.total) {
            setProgress(Math.round((evt.loaded * 100) / evt.total));
          }
        },
      });
      setResult(res.data?.text || "");
      setSegments(res.data?.segments || []);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Có lỗi xảy ra khi nhận dạng.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, progress, result, segments, error, transcribe };
};

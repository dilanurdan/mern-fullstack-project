import { useNavigate } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="error-code">404</h1>
        <h2>Aradığın sayfayı bulamadık</h2>
        <p>Görünüşe göre bir şeyler ters gitti veya sayfa artık mevcut değil.</p>

        <button
          className="back-home-btn"
          onClick={() => navigate("/")}
        >
          Ana Sayfaya Dön
        </button>
      </div>
    </div>
  );
}
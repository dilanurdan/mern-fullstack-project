import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // Eğer token yoksa, kullanıcıyı /login sayfasına gönder
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Token varsa sayfayı (children) göster
  return children;
};

export default ProtectedRoute;
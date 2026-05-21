import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  
  const { userData, setUserData } = useApp(); 

  const handleLogout = () => {
    // Verileri temizle
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    // Context'teki kullanıcıyı null yap (Arayüzün anında değişmesi için)
    setUserData(null); 
    
    alert("Başarıyla çıkış yapıldı.");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">RumeliLearn</Link>

      <ul className="navbar-links">
        <li><Link to="/">Ana Sayfa</Link></li>
        <li><Link to="/kurslar">Kurslar</Link></li>
        
        {/* Artık 'userData' context'ten geldiği için giriş yapınca anlık tepki verir */}
        {userData ? (
          <>
            <li><Link to="/kurslarim">Kurslarım</Link></li>
            <li><Link to="/favoriler">Favoriler</Link></li>
            {/* Kullanıcı ismi varsa göster, yoksa 'Profil' yaz */}
            <li>
              <Link to="/profil" className="user-name-link">
                {userData.name || "Profilim"}
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-btn">Çıkış Yap</button>
            </li>
          </>
        ) : (
          /* Kullanıcı giriş yapmamışsa bunları göster */
          <>
            <li><Link to="/login">Giriş Yap</Link></li>
            <li><Link to="/register" className="register-nav-btn">Kayıt Ol</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}
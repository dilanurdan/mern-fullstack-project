import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [userData, setUserData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [enrolled, setEnrolled] = useState([]);
  const [loading, setLoading] = useState(true);

  // Token değişimlerini ve kullanıcı verisini anlık tetikleyen fonksiyon
  const checkUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUserData(null);
      setFavorites([]);
      setEnrolled([]);
      return;
    }

    try {
      const userRes = await axios.get("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(userRes.data);
      setFavorites(userRes.data.favorites || []);
      setEnrolled(userRes.data.enrolledCourses || []);
    } catch (error) {
      console.error("Token doğrulama hatası:", error);
      if (error.response && error.response.status === 400) {
        localStorage.removeItem("token");
        setUserData(null);
        setFavorites([]);
      }
    }
  };

  useEffect(() => {
    const fetchCoursesAndUser = async () => {
      try {
        setLoading(true);
        // Kursları çek
        const response = await axios.get("http://localhost:5000/api/courses");
        setCourses(response.data);
        
        // Kullanıcıyı kontrol et
        await checkUser();
      } catch (error) {
        console.error("İlk yükleme hatası:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoursesAndUser();
  }, []);

  // FAVORİ EKLE / ÇIKAR
  const toggleFavorite = async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token || !userData) {
        alert("Favorilere eklemek için lütfen önce giriş yapın!");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/auth/favorite",
        { courseId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setFavorites(response.data.favorites || []);
    } catch (error) {
      console.error("Favori güncellenemedi:", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        courses,
        favorites,
        toggleFavorite,
        enrolled,
        userData,
        setUserData,
        loading,
        checkUser, // Giriş yaptıktan sonra çağırabilmek için dışarı açtık
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
import { Link } from "react-router-dom";
import axios from "axios";
import "./CourseCard.css";
import Rating from "./Rating";
import { useApp } from "../context/AppContext";

export default function CourseCard({ course }) {
  const { toggleFavorite, favorites, userData } = useApp();

  if (!course) return null;

  const handleEnroll = async () => {
    // Kullanıcı giriş kontrolü
    if (!userData) {
      alert("Lütfen kursa kayıt olmak için önce giriş yapın!");
      return;
    }

    const token = localStorage.getItem("token");

    // Token kontrolü
    if (!token) {
      alert("Oturum süresi dolmuş. Lütfen tekrar giriş yapın.");
      return;
    }

    try {
      await axios.post(
        "https://mern-fullstack-project-7umo.onrender.com/api/enrollments",
        { courseId: course._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(`${course.title} kursuna başarıyla kayıt oldunuz!`);
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Kayıt sırasında bir hata oluştu."
      );
    }
  };

  // Favori kontrolü
  const isFavorite = favorites.some(
    (fav) => (fav._id || fav).toString() === course._id.toString()
  );

  return (
    <div className="course-card">
      <div className="course-image-wrapper">
        <img
  src={
    course.image.startsWith("http")
      ? course.image
      : course.image.startsWith("/assets/")
      ? course.image
      : course.image.startsWith("/")
      ? `/assets${course.image}`
      : `/assets/${course.image}`
  }
  alt={course.title}
  className="course-image"
/>

        <div className="course-image-overlay">
    
          {course.title}
        </div>
      </div>

      <div className="course-content">
        <div
          className="instructor-minimal"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "10px",
          }}
        >
          <img
            src={
              course.instructorImage ||
              "https://via.placeholder.com/40"
            }
            alt={course.instructor}
            style={{
              width: "35px",
              height: "35px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />

          <div>
            <p
              className="course-instructor"
              style={{
                margin: 0,
                fontWeight: "bold",
                fontSize: "0.9rem",
              }}
            >
              {course.instructor}
            </p>

            <p
              className="instructor-title"
              style={{
                margin: 0,
                fontSize: "0.75rem",
                color: "#6b7280",
              }}
            >
              {course.instructorTitle || "Eğitmen"}
            </p>
          </div>
        </div>

        <div className="course-info">
          <Rating value={course.rating || 0} />

          <span className="course-price">
            {course.price === 0
              ? "Ücretsiz"
              : `${course.price} ₺`}
          </span>
        </div>

        <div
          className="course-actions"
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <Link
            to={`/kurs/${course._id}`}
            className="course-button"
            style={{
              flex: 1,
              textAlign: "center",
            }}
          >
            Detaylar
          </Link>

          <button
            onClick={handleEnroll}
            className="enroll-button"
            style={{
              flex: 1,
              backgroundColor: "#10b981",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Kayıt Ol
          </button>
        </div>

        <button
          onClick={() => toggleFavorite(course._id)}
          style={{
            marginTop: "10px",
            width: "100%",
            padding: "8px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            backgroundColor: isFavorite
              ? "#ef4444"
              : "#e5e7eb",
            color: isFavorite ? "white" : "black",
            fontWeight: "bold",
          }}
        >
          {isFavorite
            ? "🤍 Favorilerden Çıkar"
            : "❤️ Favoriye Ekle"}
        </button>
      </div>
    </div>
  );
}
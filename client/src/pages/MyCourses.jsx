import { useState, useEffect } from "react";
import axios from "axios";
import ProgressBar from "../components/ProgressBar";
import { Link } from "react-router-dom";
import "./MyCourses.css";

function MyCourses() {
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/enrollments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMyCourses(res.data);
      } catch (err) {
        console.error("Kurslar alınamadı:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchMyCourses();
    } else {
      setLoading(false);
    }
  }, [token]);

  const handleDelete = async (enrollmentId) => {
    const confirmDelete = window.confirm(
      "Bu kursu kurslarımdan kaldırmak istiyor musunuz?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/enrollments/${enrollmentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMyCourses((prev) =>
        prev.filter((item) => item._id !== enrollmentId)
      );
    } catch (err) {
      console.error("Silme hatası:", err);
      alert("Kurs silinemedi");
    }
  };

  const filteredCourses = myCourses.filter((item) => {
    const progress = item.progress || 0;

    if (filter === "completed") return progress === 100;
    if (filter === "ongoing") return progress < 100;

    return true;
  });

  if (loading) return <div className="loading">Yükleniyor...</div>;

  return (
    <div className="my-courses">
      <h1>Kurslarım</h1>

      <div className="filter-buttons">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          Tümü
        </button>

        <button
          className={filter === "ongoing" ? "active" : ""}
          onClick={() => setFilter("ongoing")}
        >
          Devam Eden
        </button>

        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Tamamlanan
        </button>
      </div>

      {filteredCourses.length === 0 ? (
        <p className="empty-text">Henüz kayıtlı kurs bulunmuyor.</p>
      ) : (
        <div className="courses-grid">
          {filteredCourses.map((item) => (
            <div key={item._id} className="my-course-card">
              <img
                src={
                  item.course?.image ||
                  "https://via.placeholder.com/300x180"
                }
                alt={item.course?.title || "Kurs"}
              />

              <div className="info">
                <h3>{item.course?.title || "Kurs Başlığı Yok"}</h3>

                <p>
                  Eğitmen:{" "}
                  {item.course?.instructor || "Belirtilmemiş"}
                </p>

                <ProgressBar value={item.progress || 0} />

                <div className="card-buttons">
                  <Link
                    to={`/kurs/${item.course?._id}`}
                    className="continue-btn"
                  >
                    {(item.progress || 0) === 100
                      ? "Tekrar İzle"
                      : "Devam Et"}
                  </Link>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item._id)}
                  >
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyCourses;
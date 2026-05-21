import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

import InstructorCard from "../components/InstructorCard";
import Curriculum from "../components/Curriculum";
import ReviewList from "../components/ReviewList";

import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import Loader from "../components/ui/Loader";

import "./CourseDetail.css";

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolling, setIsEnrolling] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [shouldNavigate, setShouldNavigate] = useState(false);

  // Yorum yapıldıkça veriyi tazelemek için sayaç
  const [commentCount, setCommentCount] = useState(0);

  // Kurs verisini çeken fonksiyon
  const fetchCourse = useCallback(async () => {
    try {
      const res = await axios.get(
        `https://mern-fullstack-project-7umo.onrender.com/api/courses/${id}`
      );
      setCourse(res.data);
    } catch (err) {
      console.error("Kurs çekilirken hata oluştu:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse, commentCount]);

  const enrollCourse = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setModalMessage("Lütfen kursa kaydolmak için önce giriş yapın.");
      setModalOpen(true);
      setShouldNavigate(false);
      return;
    }

    try {
      setIsEnrolling(true);

      await axios.post(
        "https://mern-fullstack-project-7umo.onrender.com/api/enrollments",
        { courseId: course._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setModalMessage(
        `${course.title} kursuna başarıyla kayıt oldunuz! Kurslarım sayfasına yönlendiriliyorsunuz...`
      );

      setModalOpen(true);
      setShouldNavigate(true);

      // Eğitime katılım başarılı olunca arayüzdeki öğrenci sayısını 1 artırıyoruz.
      setCourse(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          studentCount: (Number(prev.studentCount) || 0) + 1
        };
      });

      // Sayı senkronizasyonu için taze veriyi çeken güvenli satırımız
      await fetchCourse();

      setTimeout(() => {
        setModalOpen(false);
        navigate("/kurslarim");
      }, 2500);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        "Kayıt sırasında bir hata oluştu.";

      setModalMessage(errorMsg);
      setModalOpen(true);
      setShouldNavigate(false);
    } finally {
      setIsEnrolling(false);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);

    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    if (shouldNavigate) {
      navigate("/kurslarim");
    }
  };

  if (loading) return <Loader />;
  if (!course)
    return <div className="not-found">Kurs bilgisine ulaşılamadı.</div>;

  return (
    <div className="course-detail-container">
      <div className="course-hero">
        <div className="hero-image-wrapper">
          <img
            src={
              course.image.startsWith("http")
                ? course.image
                : course.image.startsWith("/")
                ? course.image
                : `/${course.image}`
            }
            alt={course.title}
            className="detail-image"
          />
        </div>

        <div className="hero-content">
          <span className="category-tag">{course.category}</span>
          <h1>{course.title}</h1>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "10px 0" }}>
            <span style={{ color: "#f59e0b", fontSize: "18px", fontWeight: "bold" }}>
              ★ {course.rating !== undefined && course.rating !== null ? Number(course.rating).toFixed(1) : "0.0"}
            </span>
            <span style={{ color: "#6b7280", fontSize: "14px", fontWeight: "500" }}>
              ({course.reviewCount || 0} Değerlendirme)
            </span>
          </div>

          <div className="price-tag">
            {course.price > 0 ? `${course.price} TL` : "Ücretsiz"}
          </div>

          <Button
            variant="primary"
            size="large"
            className="enroll-btn"
            onClick={enrollCourse}
            disabled={isEnrolling}
          >
            {isEnrolling ? "Kaydediliyor..." : "Eğitime Hemen Katıl"}
          </Button>
        </div>
      </div>

      <div className="course-main-layout">
        <div className="course-description-side">
          <section className="about-section">
            <h3>Kurs Hakkında</h3>
            <p>{course.description}</p>
          </section>

          {course.curriculum?.length > 0 && (
            <section className="curriculum-section">
              <h3>Eğitim İçeriği</h3>
              <Curriculum curriculum={course.curriculum} />
            </section>
          )}

          <section className="reviews-section">
            <h3>Öğrenci Değerlendirmeleri</h3>
            <ReviewList 
              courseId={course._id} 
              onCommentAdded={() => setCommentCount((prev) => prev + 1)}
            />
          </section>
        </div>

        <aside className="course-sidebar-side">
          <div className="info-box">
            <h4>Kurs Detayları</h4>

            <div className="stat-item">
              <span>⏱ Süre:</span>
              <strong>{course.duration || "Belirtilmemiş"}</strong>
            </div>

            <div className="stat-item">
              <span>📘 Ders Sayısı:</span>
              <strong>
                {course.lessonCount !== undefined && course.lessonCount !== null
                  ? `${course.lessonCount} Video`
                  : (course.lessons?.length ? `${course.lessons.length} Video` : "0 Video")}
              </strong>
            </div>

            <div className="stat-item">
              <span>👨‍🎓 Katılımcı:</span>
              <strong>
                {course.studentCount !== undefined && course.studentCount !== null
                  ? `${course.studentCount} Öğrenci`
                  : "0 Öğrenci"}
              </strong>
            </div>

            <div className="stat-item">
              <span>🏅 Seviye:</span>
              <strong>{course.level || "Başlangıç"}</strong>
            </div>
          </div>

          <InstructorCard
            instructor={course.instructor}
            instructorImage={course.instructorImage}
            instructorTitle={course.instructorTitle}
          />
        </aside>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={handleModalClose}
        title="Bilgilendirme"
      >
        <div className="modal-status-content">
          <p>{modalMessage}</p>

          {!localStorage.getItem("token") && (
            <Button
              onClick={() => navigate("/login")}
              style={{ marginTop: "15px" }}
            >
              Giriş Yap
            </Button>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default CourseDetail;
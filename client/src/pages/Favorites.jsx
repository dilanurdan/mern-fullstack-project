import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import "./Favorites.css";

function Favorites() {
  const { favorites, courses, toggleFavorite } = useApp();

  const removeFavorite = (id) => {
    toggleFavorite(id);
  };

  // favorites dizisindeki ID'lerden sadece 'courses' içinde gerçekten var olanları filtreliyoruz.
  // Böylece veritabanından silinmiş veya havada kalmış hayali ID'ler sayacı kirletemez.
  const validFavorites = favorites ? favorites.filter(id => 
    courses.some(c => c._id?.toString() === id?.toString())
  ) : [];

  // Boş kontrolünü taze filtrelenmiş listemize göre yapıyoruz
  if (validFavorites.length === 0) {
    return (
      <div className="favorites empty">
        <h1>Favorilerim</h1>
        <p>
          Henüz favorilerine bir kurs eklemedin. Yeni şeyler keşfetmeye ne dersin?
        </p>
        <Link to="/" className="discover-btn">
          Kursları Keşfet
        </Link>
      </div>
    );
  }

  return (
    <div className="favorites">
      <div className="favorites-header">
        <h1>Favori Kurslarım</h1>
        {/* favorites.length yerine sadece ekrana basılacak gerçek kurs sayısını yazıyoruz */}
        <span>{validFavorites.length} Kurs Listeleniyor</span>
      </div>

      <div className="favorites-list">
        {validFavorites.map((id) => {
          const course = courses.find(
            (c) => c._id?.toString() === id?.toString()
          );

          if (!course) return null;

          return (
            <div key={id} className="favorite-card">
              <div className="card-image">
                <img src={course.image} alt={course.title} />
                <span className="category-badge">
                  {course.category}
                </span>
              </div>

              <div className="favorite-info">
                <h3>{course.title}</h3>

                <div className="instructor-detail">
                  <p className="name">{course.instructor}</p>
                  {course.instructorTitle && (
                    <p className="title">
                      {course.instructorTitle}
                    </p>
                  )}
                </div>

                <div className="card-footer">
                  <span className="price">
                    {course.price === 0
                      ? "Ücretsiz"
                      : `${course.price} TL`}
                  </span>
                </div>

                <div className="actions">
                  <Link
                    to={`/kurs/${course._id}`}
                    className="detail-link"
                  >
                    Eğitime Git
                  </Link>

                  <button
                    className="remove-button"
                    onClick={() => removeFavorite(id)}
                  >
                    🗑️ Kaldır
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Favorites;
import { useState } from "react";
import CourseCard from "../components/CourseCard";
import SearchBar from "../components/SearchBar";
import FeaturedSlider from "../components/FeaturedSlider";
import { useApp } from "../context/AppContext";
import "./Home.css";

function Home() {
  const { courses, loading } = useApp();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tümü");

  if (loading) return <div className="loading">Yükleniyor...</div>;

  const categories = [
    "Tümü",
    ...new Set(courses.map((c) => c.category))
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "Tümü" ||
      course.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const popularCourses = [...courses]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 4);

  return (
    <div className="home">
      <h1>Öne Çıkan Kurslar</h1>

      <FeaturedSlider courses={courses || []} />

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="category-filter">
        {categories.map((cat) => (
          <button
            key={cat}
            className={cat === selectedCategory ? "active" : ""}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <h2>En Popüler Kurslar</h2>
      <div className="course-grid">
        {popularCourses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>

      <h2>Tüm Kurslar</h2>
      <div className="course-grid">
        {filteredCourses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
}

export default Home;
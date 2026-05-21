import { useState, useEffect } from "react";
import axios from "axios";
import CourseCard from "../components/CourseCard";
import FilterPanel from "../components/FilterPanel";
import "./Courses.css";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("Tümü");
  const [level, setLevel] = useState("Tümü");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "https://mern-fullstack-project-7umo.onrender.com/api/courses"
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const categories = Array.from(
    new Set(courses.map((c) => c.category))
  );

  let filteredCourses = [...courses].filter((course) => {
    const categoryMatch =
      category === "Tümü" || course.category === category;
    const levelMatch =
      level === "Tümü" || course.level === level;

    return categoryMatch && levelMatch;
  });

  if (sort === "price-asc") {
    filteredCourses.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    filteredCourses.sort((a, b) => b.price - a.price);
  }

  if (loading) return <div className="loading">Yükleniyor...</div>;

  return (
    <div className="courses-page">
      <h1>Tüm Kurslar</h1>

      <FilterPanel
        category={category}
        setCategory={setCategory}
        level={level}
        setLevel={setLevel}
        sort={sort}
        setSort={setSort}
        categories={categories}
      />

      <div className="course-grid">
        {filteredCourses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
}

export default Courses;
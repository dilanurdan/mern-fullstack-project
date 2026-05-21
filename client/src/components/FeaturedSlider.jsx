import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./FeaturedSlider.css";

function FeaturedSlider({ courses }) {
  // Gelen kurslardan ilk 5 tanesini öne çıkan yapıyoruz
  const featuredCourses = courses && courses.length > 0 ? courses.slice(0, 5) : [];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (featuredCourses.length === 0) return;

    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % featuredCourses.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [featuredCourses.length]);

  if (featuredCourses.length === 0) return null;

  const prevSlide = () => {
    setIndex(index === 0 ? featuredCourses.length - 1 : index - 1);
  };

  const nextSlide = () => {
    setIndex((index + 1) % featuredCourses.length);
  };

  const course = featuredCourses[index];

  return (
    <div className="slider">
      <button className="nav prev" onClick={prevSlide}>‹</button>

      <div className="slide">
        <img 
  src={
    course.image.startsWith("http")
      ? course.image
      : course.image.startsWith("/assets/")
      ? course.image
      : `/assets/${course.image.startsWith("/") ? course.image.substring(1) : course.image}`
  } 
  alt={course.title} 
/>
        <div className="content">
          <h2>{course.title}</h2>
          <p>{course.description}</p>
          {}
          <Link to={`/kurs/${course._id}`} className="btn">
            Kursu İncele
          </Link>
        </div>
      </div>

      <button className="nav next" onClick={nextSlide}>›</button>
    </div>
  );
}

export default FeaturedSlider;
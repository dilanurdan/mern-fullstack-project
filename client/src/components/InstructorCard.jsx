import "./InstructorCard.css";

function InstructorCard({ instructor, instructorImage, instructorTitle }) {
  return (
    <div className="instructor-card">
      <div className="instructor-avatar-container">
        {instructorImage ? (
          <img 
            src={instructorImage} 
            alt={instructor} 
            className="instructor-img" 
          />
        ) : (
          <div className="instructor-initials">
            {/* Eğer resim yoksa ismin ilk harfi görünür */}
            {instructor ? instructor.charAt(0).toUpperCase() : "?"}
          </div>
        )}
      </div>

      <div className="instructor-info">
        <h3>{instructor}</h3>
        {/* MongoDB'den gelen instructorTitle'ı basıyoruz */}
        <p>{instructorTitle || "Uzman Eğitmen"}</p>
      </div>
    </div>
  );
}

export default InstructorCard;
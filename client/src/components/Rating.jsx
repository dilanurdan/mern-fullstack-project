import "./Rating.css";

function Rating({ value = 0, max = 5 }) {
  const stars = [];

  for (let i = 1; i <= max; i++) {
    if (i <= Math.floor(value)) {
      stars.push("★");
    } else {
      stars.push("☆");
    }
  }

  return (
    <div className="rating">
      {stars.map((star, index) => (
        <span key={index}>{star}</span>
      ))}

      <span className="rating-value">
        ({value})
      </span>
    </div>
  );
}

export default Rating;
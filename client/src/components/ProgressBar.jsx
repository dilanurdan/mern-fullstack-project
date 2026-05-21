import "./ProgressBar.css";

function ProgressBar({ value = 0 }) {
  const safeValue = Math.min(Math.max(value, 0), 100);

  return (
    <div className="progress-container">
      <div
        className="progress-fill"
        style={{
          width: `${safeValue}%`,
          transition: "0.3s ease"
        }}
      >
        {safeValue}%
      </div>
    </div>
  );
}

export default ProgressBar;
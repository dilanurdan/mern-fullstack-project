import { useState } from "react";
import "./Curriculum.css";

function Curriculum({ curriculum }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!curriculum || curriculum.length === 0) {
    return <p>Müfredat bulunamadı.</p>;
  }

  return (
    <div className="curriculum">
      <h2>Müfredat</h2>

      {curriculum.map((section, index) => (
        <div key={index} className="curriculum-section">
          <div
            className="section-header"
            onClick={() =>
              setOpenIndex(openIndex === index ? null : index)
            }
          >
            {section.section}
            <span>
              {openIndex === index ? "−" : "+"}
            </span>
          </div>

          {openIndex === index && (
            <ul>
              {section.lessons.map((lesson, i) => (
                <li key={i}>{lesson}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default Curriculum;
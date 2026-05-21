import "./Modal.css";

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h3>{title}</h3>
        <div className="modal-content">{children}</div>
        <button className="modal-close" onClick={onClose}>
          Kapat
        </button>
      </div>
    </div>
  );
}

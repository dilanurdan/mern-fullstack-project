import { useState, useEffect } from "react";
import axios from "axios";

// Buraya 'onCommentAdded' prop'unu ekledik
function ReviewList({ courseId, onCommentAdded }) { 
  const [allReviews, setAllReviews] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    if (!courseId) return;

    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `https://mern-fullstack-project-7umo.onrender.com/api/comments/${courseId}`
        );
        setAllReviews(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchComments();
  }, [courseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("Giriş yap");

    try {
      const res = await axios.post(
        "https://mern-fullstack-project-7umo.onrender.com/api/comments",
        { courseId, content: newComment, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const freshComment = res.data;

      if (!freshComment.user || typeof freshComment.user === "string") {
        freshComment.user = { name: "Ben" };
      }

      setAllReviews((prev) => [freshComment, ...prev]);
      setNewComment("");
      setRating(5);

      // Yorum başarıyla eklenince üst bileşene haber veriyoruz
      if (onCommentAdded) {
        onCommentAdded();
      }

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ maxWidth: "600px", marginTop: "12px", fontFamily: "sans-serif" }}>
      <form onSubmit={handleSubmit} style={{ backgroundColor: "#fff", padding: "16px", borderRadius: "12px", border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", marginBottom: "24px" }}>
        <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#4b5563", marginBottom: "12px" }}>Kursu Değerlendir</h4>
        
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Yorum yaz..."
          rows="3"
          style={{ width: "100%", boxSizing: "border-box", padding: "10px", fontSize: "14px", border: "1px solid #d1d5db", borderRadius: "8px", resize: "none", outline: "none", marginBottom: "12px" }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: "12px", color: "#6b7280", marginRight: "8px" }}>Puanınız:</span>
            <select 
              value={rating} 
              onChange={(e) => setRating(Number(e.target.value))}
              style={{ backgroundColor: "#f3f4f6", border: "1px solid #e5e7eb", borderRadius: "6px", padding: "6px 12px", cursor: "pointer", outline: "none" }}
            >
              <option value={5}>5 ⭐ Harika</option>
              <option value={4}>4 ⭐ Çok İyi</option>
              <option value={3}>3 ⭐ Ortalama</option>
              <option value={2}>2 ⭐ Kötü</option>
              <option value={1}>1 ⭐ Çok Kötü</option>
            </select>
          </div>

          <button style={{ padding: "8px 24px", backgroundColor: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: "500", cursor: "pointer" }}>
            Yorum Yap
          </button>
        </div>
      </form>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {allReviews.map((r) => {
          const userName = r.user?.name || r.user || "Anonim Kullanıcı";
          const userInitial = typeof userName === "string" ? userName.charAt(0).toUpperCase() : "?";

          return (
            <div key={r._id || Math.random()} style={{ backgroundColor: "#f9fafb", padding: "16px", borderRadius: "12px", border: "1px solid #f3f4f6", display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#dbeafe", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "14px", flexShrink: 0 }}>
                {userInitial}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "14px", fontWeight: "600", color: "#1f2937" }}>{userName}</span>
                  <span style={{ fontSize: "12px", backgroundColor: "#fef3c7", color: "#92400e", padding: "2px 8px", borderRadius: "12px", fontWeight: "bold", display: "inline-flex", alignItems: "center", gap: "2px" }}>
                    ★ {r.rating}
                  </span>
                </div>
                <p style={{ fontSize: "14px", color: "#4b5563", marginTop: "6px", margin: "6px 0 0 0", lineHeight: "1.5", wordBreak: "break-word" }}>
                  {r.content || r.comment}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ReviewList;
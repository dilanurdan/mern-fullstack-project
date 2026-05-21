import { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";

function Profile() {
  const [userData, setUserData] = useState({ name: "", email: "", avatar: "" });
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", avatar: "" });
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Eğer avatar yoksa ya da kırık linkse gösterilecek varsayılan yedek avatar
  const defaultAvatar = `https://api.dicebear.com/7.x/initials/svg?seed=${userData.name || "User"}&backgroundColor=2563eb`;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("https://mern-fullstack-project-7umo.onrender.com/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserData(res.data);
        setForm(res.data);
      } catch (err) {
        console.error("Profil yüklenemedi", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchProfile();
    else setLoading(false);
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        "https://mern-fullstack-project-7umo.onrender.com/api/auth/update",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Backend'den dönen veriye göre (res.data.user veya direkt res.data) veriyi tazeleyin
      const updatedUser = res.data.user || res.data;
      setUserData(updatedUser);
      setForm(updatedUser);
      setEdit(false);
      alert("Profil başarıyla güncellendi!");
    } catch (err) {
      alert("Güncelleme sırasında bir hata oluştu.");
    }
  };

  const handleCancel = () => {
    setForm(userData);
    setEdit(false);
  };

  if (loading) return <div className="loading">Yükleniyor...</div>;

  return (
    <div className="profile">
      <h1>Profil Ayarları</h1>

      <div className="avatar-wrapper">
        <img
          // 🔥 KİLİT DÜZELTME 2: Link tamamen boşsa placeholder yerine şık defaultAvatar'ı basıyoruz
          src={userData.avatar && userData.avatar.trim() !== "" ? userData.avatar : defaultAvatar}
          alt="avatar"
          className="avatar"
          // 🔥 KİLİT DÜZELTME 3: Link var ama bozuksa/kırıksa anında yakalayıp defaultAvatar'a çeviriyoruz
          onError={(e) => {
            e.target.src = defaultAvatar;
          }}
        />
      </div>

      {!edit ? (
        <div className="profile-info">
          <p><b>Ad:</b> {userData.name}</p>
          <p><b>Email:</b> {userData.email}</p>

          <button onClick={() => setEdit(true)} className="edit-btn">
            Profili Düzenle
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="profile-form">
          <label>
            Ad Soyad
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>

          <label>
            Email (Değiştirilemez)
            <input value={form.email} disabled className="disabled-input" />
          </label>

          <label>
            Avatar URL
            <input
              value={form.avatar || ""}
              onChange={(e) => setForm({ ...form, avatar: e.target.value })}
              placeholder="https://example.com/resim.jpg"
            />
          </label>

          <div className="buttons">
            <button type="submit" className="save-btn">
              Değişiklikleri Kaydet
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="cancel-btn"
            >
              İptal
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Profile;
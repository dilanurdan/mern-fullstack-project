# 📚 RumeliLearn – MERN Stack Full-Stack Eğitim Platformu

RumeliLearn, modern web geliştirme mimarisi standartlarına uygun olarak geliştirilmiş, hem sunucu (back-end) hem istemci (front-end) tarafı aktif çalışan, veritabanı destekli ve kimlik doğrulama içeren full-stack bir online eğitim platformudur. 

Geçen dönem geliştirilen istemci arayüzü; bu dönem **Node.js, Express.js ve MongoDB Atlas** entegrasyonu ile tam kapsamlı bir RESTful API ekosistemine dönüştürülmüştür.

---

## 🚀 Canlı Önizleme & Linkler
- **Frontend (Client) Canlı Linki:** [Uygulama Linki - Vercel/Netlify](https://your-frontend-link.vercel.app)
- **Backend (Server) API Linki:** [API Linki - Render](https://your-backend-link.onrender.com)
- **GitHub Deposu:** [Repository Linki](https://github.com/dilanurdan/mern-fullstack-project)

---

## 🛠️ Kullanılan Teknolojiler

### Frontend (İstemci - Client)
- **React.js & Vite** (Bileşen tabanlı modern arayüz mimarisi)
- **React Router DOM** (Sayfa yönlendirmeleri ve Korumalı Rotalar)
- **Context API (`AppContext`)** (Global state yönetimi)
- **Axios** (Asenkron HTTP/API istekleri)
- **CSS3** (Responsive tasarım ve saf CSS bileşenleri)

### Backend (Sunucu - Server) & Veritabanı
- **Node.js & Express.js** (Modüler RESTful API ve MVC mimarisi)
- **MongoDB Atlas & Mongoose** (NoSQL bulut veritabanı ve nesne modelleme)
- **JWT (JSON Web Token)** (Oturum yönetimi ve güvenli kimlik doğrulama)
- **Bcrypt** (Kullanıcı şifrelerinin güvenli şekilde hashlenmesi)
- **Cors & Dotenv** (Güvenlik ve ortam değişkenleri yönetimi)

---

## 📂 Proje Klasör Yapısı
```text

231201042_DilaNurDAN_BLG331_RumeliLearn/
│
├── client/                         # Frontend (İstemci) Katmanı
│   ├── public/
│   ├── src/
│   │   ├── components/            # Kurs kartları, slider ve filtre bileşenleri
│   │   │   └── ui/                # Ortak UI Elemanları (Button, Loader, Modal)
│   │   ├── context/               # AppContext (Global State Yönetimi)
│   │   ├── data/                  # courses.json veri dosyaları
│   │   ├── pages/                 # Sayfa bileşenleri
│   │   └── main.jsx
│   │
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── server/                        # Backend (Sunucu) Katmanı
│   ├── controllers/               # İş mantığı kontrolörleri
│   ├── middleware/                # JWT ve hata yönetimi middleware'leri
│   ├── models/                    # Mongoose modelleri
│   ├── routes/                    # Express API rotaları
│   ├── .env
│   ├── .gitignore
│   ├── index.js                   # Sunucu başlangıç dosyası
│   ├── package-lock.json
│   └── package.json
│
├── ActivityDiagram.png
├── Component(Bileşen)İlişkileri.png
├── Use-CaseDiagram.png
├── VeritabanıŞemasınıGösteren.png
│
└── README.md

---

## 🧩 Uygulama Özellikleri & CRUD İşlemleri

- **Gelişmiş Kimlik Doğrulama:** JWT tabanlı kayıt olma (Register) ve giriş yapma (Login) sistemleri.
- **Korumalı Rotalar (Protected Routes):** `/profil`, `/kurslarim` ve `/favoriler` sayfalarına giriş yapmayan kullanıcıların erişmesi hem frontend hem backend tarafında engellenmiştir.
- **Dinamik Kurs Yönetimi (CRUD):** Kursların listelenmesi, detaylarının çekilmesi, kurs ekleme, güncelleme ve silme API endpoint'leri.
- **Kurs Kayıt (Enrollment) Sistemi:** Öğrencilerin kurslara kayıt olabilmesi, kayıtlarını iptal edebilmesi ve mükerrer kayıtların veritabanı seviyesinde engellenmesi.
- **Yorum ve Puanlama:** Kurslara yorum yapabilme ve veritabanındaki verilere göre dinamik ortalama puan hesaplama sistemi.
- **Gelişmiş Arama ve Filtreleme:** Kategori, seviye ve fiyat bazlı canlı veri filtreleme.
- **Kullanıcı Deneyimi (UX):** Asenkron işlemler için `Loader` (Spinner), bilgilendirmeler için modüler `Modal` bileşenleri.

---

## 🗄️ Veri Yönetimi & Veritabanı İlişkileri

Projede **MongoDB Atlas** üzerinde canlı olarak çalışan, Mongoose ORM kütüphanesi ile modellenmiş 4 farklı şema bulunmaktadır. Veriler arasındaki ilişkiler `Schema.Types.ObjectId` ve `ref` nitelikleri ile kurulmuş, ihtiyaç anında `.populate()` metodu ile birleştirilmiştir:

- **User Model:** Kullanıcı verilerini ve favori kurs listesi ilişkilerini tutar (Unique email & Validation içerir).
- **Course Model:** Kurs içeriklerini, fiyat, seviye ve aktif kayıtlı öğrenci sayısını (`studentCount`) tutar.
- **Enrollment Model:** Hangi kullanıcının hangi kursa kayıtlı olduğunu birbirine bağlar (`User` -> `Course` ilişkisi).
- **Comment Model:** Kurslara yapılan yorumları ve yorumu yapan kullanıcı referansını saklar.

---

## 📱 Responsive Tasarım

Uygulama **mobile**, **tablet** ve **desktop** ekranlar için saf CSS breakpoint'leri kullanılarak esnek grid sistemiyle tasarlanmıştır.
- Mobile: `max-width 768px`
- Tablet: `768px – 1024px`
- Desktop: `1024px` ve üzeri

---


## ⚙️ Kurulum ve Çalıştırma Adımları

Projeyi yerelde çalıştırabilmek için frontend ve backend bağımlılıklarının ayrı ayrı kurulması gerekmektedir.

### 1. Depoyu Klonlayın

```bash
git clone https://github.com/DilaNurDAN/RumeliLearn.git
cd RumeliLearn
```

---

## 🖥️ Sunucu (Backend) Kurulumu

Server klasörüne geçiş yapın ve gerekli bağımlılıkları yükleyin:

```bash
cd server
npm install
```

Server klasörü içerisinde bir `.env` dosyası oluşturup aşağıdaki ortam değişkenlerini tanımlayın:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION
JWT_SECRET=YOUR_SECRET_KEY
```

Sunucuyu başlatın:

```bash
npm start
```

Geliştirme modunda çalıştırmak için:

```bash
npm run dev
```

---

## 💻 İstemci (Frontend) Kurulumu

Yeni bir terminal açıp `client` klasörüne geçin:

```bash
cd client
npm install
npm run dev
```

Uygulama varsayılan olarak aşağıdaki adreste çalışacaktır:

```txt
http://localhost:5173
```

---
## 👩‍💻 Geliştirici

Dila Nur DAN  
İstanbul Rumeli Üniversitesi  
Bilgisayar Mühendisliği

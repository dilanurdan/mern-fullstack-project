require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const Course = require('./models/Course');

const courseRoutes = require('./routes/courseRoutes');
const authRoutes = require('./routes/authRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');

const commentRoutes = require('./routes/commentRoutes'); 

const errorHandler = require('./middleware/errorMiddleware');

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/courses', courseRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/enrollments', enrollmentRoutes);
// Yorum rotasını dış dünyaya açtık
app.use('/api/comments', commentRoutes); 

// home route
app.get('/', (req, res) => {
    res.send('RumeliLearn Backend Servisi Çalışıyor!');
});

// error handler
app.use(errorHandler);

// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Bağlantısı Başarılı!");
  })
  .catch((err) => console.log("❌ Bağlantı Hatası:", err));

// seed
const seedDatabase = async () => {
    try {
        const count = await Course.countDocuments();

        if (count === 0) {
            await Course.insertMany([
                {
                    title: "React ile Web Geliştirme",
                    instructor: "Dila Nur Dan",
                    price: 349,
                    description: "Sıfırdan React öğrenin.",
                    category: "Yazılım",
                    level: "Başlangıç",
                    image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                }
            ]);

            console.log("✅ Varsayılan kurslar yüklendi!");
        }
    } catch (err) {
        console.log(err);
    }
};

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server http://localhost:${PORT}`);
});
seedDatabase();
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course'); // Kurs modelini sayaç işlemleri için dahil ettik

// Kursa Kayıt Ol (POST)
exports.enrollCourse = async (req, res) => {
  try {

    const userId = req.user.id || req.user._id;

    if (!userId || !req.body.courseId) {
      return res.status(400).json({ message: "Kullanıcı veya Kurs bilgisi eksik!" });
    }
    const existingEnrollment = await Enrollment.findOne({
      user: userId,
      course: req.body.courseId
    });

    if (existingEnrollment) {
      return res.status(400).json({
        message: "Bu kursa zaten kayıtlısınız."
      });
    }

    const newEnrollment = await Enrollment.create({
      user: userId,
      course: req.body.courseId
    });
    
    // Veritabanındaki öğrenci sayısını kalıcı olarak 1 artırır
    await Course.findByIdAndUpdate(req.body.courseId, {
      $inc: { studentCount: 1 }
    });
    
    res.status(201).json(newEnrollment);
  } catch (err) {
    console.error("Kayıt Hatası (Backend):", err.message);
    res.status(500).json({ error: "Kayıt işlemi başarısız: " + err.message });
  }
};

// Kullanıcının Kurslarını Getir (GET + Populate)
exports.getMyCourses = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    
    // Sadece giriş yapan kullanıcının kayıtlarını getir
    const courses = await Enrollment.find({ user: userId }).populate('course');
    res.json(courses);
  } catch (err) {
    console.error("Kursları Getirme Hatası (Backend):", err.message);
    res.status(500).json({ error: "Kurslar getirilemedi: " + err.message });
  }
};

// Kurs Kaydını Sil (DELETE)
exports.cancelEnrollment = async (req, res) => {
  try {
    //Silmeden önce hangi kurs olduğunu buluyoruz ki sayısını düşürebilelim
    const enrollment = await Enrollment.findById(req.params.id);
    
    if (!enrollment) {
      return res.status(404).json({ message: "Bu kayıt bulunamadı!" });
    }

    const courseId = enrollment.course;

    // Kaydı siliyoruz
    await Enrollment.findByIdAndDelete(req.params.id);
    
    //Veritabanındaki öğrenci sayısını kalıcı olarak 1 azaltır
    await Course.findByIdAndUpdate(courseId, {
      $inc: { studentCount: -1 }
    });
    
    res.json({ message: "Kayıt başarıyla silindi." });
  } catch (err) {
    console.error("Silme Hatası (Backend):", err.message);
    res.status(500).json({ error: "Silme işlemi başarısız: " + err.message });
  }
};
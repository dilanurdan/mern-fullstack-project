const Course = require('../models/Course');

// Tüm kursları veritabanından getir
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: "Kurslar getirilemedi", error });
    }
};

// Yeni kurs ekle (Test için kullanacağız)
exports.createCourse = async (req, res) => {
    try {
        const newCourse = new Course(req.body);
        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse);
    } catch (error) {
        res.status(400).json({ message: "Kurs eklenemedi", error });
    }
};
// Belirli bir kursun detayını getir
exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: "Kurs bulunamadı" });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: "Geçersiz ID formatı veya sunucu hatası", error });
    }
};
// Kurs güncelle
exports.updateCourse = async (req, res) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedCourse) {
            return res.status(404).json({ message: "Kurs bulunamadı" });
        }

        res.json(updatedCourse);
    } catch (error) {
        res.status(500).json({ message: "Kurs güncellenemedi", error });
    }
};

// Kurs sil
exports.deleteCourse = async (req, res) => {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);

        if (!deletedCourse) {
            return res.status(404).json({ message: "Kurs bulunamadı" });
        }

        res.json({ message: "Kurs silindi" });
    } catch (error) {
        res.status(500).json({ message: "Kurs silinemedi", error });
    }
};
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

const { protect } = require('../middleware/authMiddleware');

// Tüm kursları getir (HERKES GÖREBİLİR)
router.get('/', courseController.getAllCourses);

// TEK BİR KURSU GETİR (HERKES GÖREBİLİR)
router.get('/:id', courseController.getCourseById);

// SADECE GİRİŞ YAPAN KULLANICI
router.post('/', protect, courseController.createCourse);
router.put('/:id', protect, courseController.updateCourse);
router.delete('/:id', protect, courseController.deleteCourse);

module.exports = router;
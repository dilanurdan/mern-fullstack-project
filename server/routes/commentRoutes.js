const express = require('express');
const router = express.Router();
const { addComment, getCourseComments } = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');

// Kursun yorumlarını getirmek için: GET /api/comments/:courseId
router.get('/:courseId', getCourseComments);

// Yeni yorum eklemek için: POST /api/comments (Giriş zorunlu)
router.post('/', protect, addComment);

module.exports = router;
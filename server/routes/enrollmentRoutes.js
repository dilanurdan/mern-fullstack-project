const express = require('express');
const router = express.Router();
const { enrollCourse, getMyCourses, cancelEnrollment } = require('../controllers/enrollmentController');

const { protect } = require('../middleware/authMiddleware'); 


router.post('/', protect, enrollCourse); 
router.get('/', protect, getMyCourses);
router.delete('/:id', protect, cancelEnrollment);

module.exports = router;
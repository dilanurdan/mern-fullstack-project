const mongoose = require('mongoose');
const Comment = require('../models/Comment');
const Course = require('../models/Course');

exports.addComment = async (req, res) => {
  try {
    const { courseId, content, rating } = req.body;

    if (!courseId || !content || !rating) {
      return res.status(400).json({ message: "Eksik veri" });
    }
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Yetkisiz işlem" });
    }

    // 1. Yeni Yorumu Kaydet
    const newComment = new Comment({
      course: courseId,
      user: req.user.id,
      content,
      rating: Number(rating)
    });
    await newComment.save();

    const targetCourseId = new mongoose.Types.ObjectId(courseId);

    // 3. Kursa Ait Tüm Yorumları Getir ve Hesapla
    const allCourseComments = await Comment.find({ course: targetCourseId });
    
    if (allCourseComments.length > 0) {
      const reviewCount = allCourseComments.length;
      const totalRating = allCourseComments.reduce((sum, item) => sum + item.rating, 0);
      const averageRating = Number((totalRating / reviewCount).toFixed(1));

      // 4. Kurs Dokümanını Güncelle
      await Course.findByIdAndUpdate(courseId, {
        rating: averageRating,
        reviewCount: reviewCount
      });
    }

    // 5. İstemciye Saf Nesne Dön
    const populatedComment = await newComment.populate('user', 'name');
    const responseData = populatedComment.toObject();

    return res.status(201).json(responseData);

  } catch (error) {
    console.log("ADD COMMENT ERROR:", error);
    return res.status(400).json({ message: "Yorum eklenemedi" });
  }
};

exports.getCourseComments = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!courseId) {
      return res.status(400).json({ message: "courseId gerekli" });
    }

    // Kursa ait yorumları en yeni tarihten en eskiye doğru sıralayarak getiriyoruz
    const comments = await Comment.find({ course: courseId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    return res.json(comments);

  } catch (error) {
    console.log("GET COMMENTS ERROR:", error);
    return res.status(500).json({ message: "Yorumlar getirilemedi" });
  }
};
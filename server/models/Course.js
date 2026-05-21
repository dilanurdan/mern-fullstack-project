const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  instructor: { type: String, required: true },
  instructorTitle: String, 
  instructorImage: String, 
  price: {
    type: Number,
    required: true,
    min: 0
  },
  level: {
    type: String,
    enum: ['Başlangıç', 'Orta', 'İleri'],
    default: 'Başlangıç'
  },
  description: String,
  image: String,
  category: String,
  

  duration: { type: String, default: "Belirtilmemiş" },
  studentCount: { type: Number, default: 0 },
  
  // JSON'dan gelen lessons dizisini karşılayacak yapı
  lessons: [
    { title: { type: String } }
  ],
  
  // Müfredat alanı
  curriculum: [
    {
      section: { type: String },
      lessons: [{ type: String }]
    }
  ],

  // Puanlama alanları
  rating: {
    type: Number,
    default: 0 
  },
  reviewCount: {
    type: Number,
    default: 0 
  }

}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);
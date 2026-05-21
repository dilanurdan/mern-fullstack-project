const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  // Yorumun hangi kursa yapıldığını tutar ve Course modeline referans verir
  course: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course', 
    required: [true, 'Yorumun hangi kursa ait olduğu belirtilmelidir.'] 
  },
  
  // Yorumu hangi kullanıcının yaptığını tutar ve User modeline referans verir
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: [true, 'Yorum sahibinin belirtilmesi zorunludur.'] 
  },
  
  // Kullanıcının yazdığı yorum metni
  content: { 
    type: String, 
    required: [true, 'Yorum içeriği boş bırakılamaz.'],
    trim: true // Metnin başındaki ve sonundaki gereksiz boşlukları otomatik temizler
  },
  
  // Kursa verilen puan
  rating: { 
    type: Number, 
    required: [true, 'Puanlama yapılması zorunludur.'],
    min: [1, 'Puan en az 1 olabilir.'],
    max: [5, 'Puan en fazla 5 olabilir.']
  },
  
  // Yorumun oluşturulma tarihi
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Comment', commentSchema);
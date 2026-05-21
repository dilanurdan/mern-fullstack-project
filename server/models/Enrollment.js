const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // User modeliyle ilişki
    required: true 
  },
  course: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course', // Course modeliyle ilişki
    required: true 
  },
  enrolledAt: { 
    type: Date, 
    default: Date.now 
  }
});
// Aynı kullanıcı aynı kursa iki kez kayıt olamaz
enrollmentSchema.index(
  { user: 1, course: 1 },
  { unique: true }
);
module.exports = mongoose.model('Enrollment', enrollmentSchema);
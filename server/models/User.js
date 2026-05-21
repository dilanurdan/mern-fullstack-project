const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },

email: {
  type: String,
  required: true,
  unique: true,
  trim: true,
  lowercase: true,
  match: [/^\S+@\S+\.\S+$/, 'Geçerli email girin']
},

  password: { 
    type: String, 
    required: true 
  },

  role: { 
    type: String, 
    default: 'student' 
  },

  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }
  ]

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  // Basic Auth Fields
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  }, // Remember to hash this in the controller!
  
  // Profile Information
  phoneNumber: { 
    type: String 
  },
  profilePicture: { 
    type: String 
  }, // URL to image
}, { timestamps: true });

// Exports using the legacy style
const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
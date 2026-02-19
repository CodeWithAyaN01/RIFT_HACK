const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  // Basic Auth Fields
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Remember to hash this in the controller!
  phoneNumber: { type: String },
  }, 
{ timestamps: true });


const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
const mongoose = require('mongoose');
const {Schema}=mongoose
const featureSchema = new Schema({
    Day: {
      type: Date, // For storing the date (e.g., 4/10/2022)
      required: true,
    },
    Age: {
      type: String, // For age group (e.g., "15-25" or ">25")
      required: true,
    },
    Gender: {
      type: String, // For gender (e.g., "Male" or "Female")
      required: true
    },

      A: { type: Number, required: true }, // Column A
      B: { type: Number, required: true }, // Column B
      C: { type: Number, required: true }, // Column C
      D: { type: Number, required: true }, // Column D
      E: { type: Number, required: true }, // Column E
      F: { type: Number, required: true }, // Column F
    
  });
  
module.exports = mongoose.model('Features', featureSchema);
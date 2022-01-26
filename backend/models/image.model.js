require('dotenv').config();
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  cloudinary_id: String,
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
  ],
});

module.exports = mongoose.model('Image', imageSchema);

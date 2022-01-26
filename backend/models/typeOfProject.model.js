require('dotenv').config();
const mongoose = require('mongoose');

const typeOfProjectSchema = new mongoose.Schema({
  name: String,
  description: String,
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
  ],
});

module.exports = mongoose.model('TypeOfProject', typeOfProjectSchema);

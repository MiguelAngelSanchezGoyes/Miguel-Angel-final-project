require('dotenv').config();
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  brand: String,
  name: String,
  description: String,
  viewer: String,
  blueprints: String,
  typology: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TypeOfProject',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  pictures: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Image',
    },
  ],
});

module.exports = mongoose.model('Project', projectSchema);

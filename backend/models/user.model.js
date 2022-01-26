require('dotenv').config();
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  passwd: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  typeUser: { type: String, required: true },
  projects: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  ],
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
    delete returnedObject.passwd;
  },
});

module.exports = mongoose.model('User', userSchema);

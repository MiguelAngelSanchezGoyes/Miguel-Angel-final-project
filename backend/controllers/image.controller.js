const cloudinary = require('../helpers/cloudinary.helper');
const Image = require('../models/image.model');
const Project = require('../models/project.model');

async function getAllImages(req, res, next) {
  try {
    let image = await Image.find().populate('projects', { name: 1 });
    res.json(image);
  } catch (err) {
    next(err);
  }
}

async function addImage(req, res, next) {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    let image = new Image({
      name: req.body.name,
      avatar: result.secure_url,
      cloudinary_id: result.public_id,
    });

    await image.save();
    res.json(image);
  } catch (err) {
    next(err);
  }
}

async function deleteImage(req, res, next) {
  let image = await Image.findByIdAndDelete(req.params.id);
  await cloudinary.uploader.destroy(image.cloudinary_id);
  await image.remove();
  res.json(image);
  try {
    if (image) {
      res.status(202).json({ deleteId: req.params.id });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (err) {
    next(err);
  }
}

async function updateImage(req, res, next) {
  try {
    let image = await Image.findById(req.params.id);
    await cloudinary.uploader.destroy(image.cloudinary_id);
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }
    const data = {
      name: req.body.name || image.name,
      avatar: result?.secure_url || image.avatar,
      cloudinary_id: result?.public_id || image.cloudinary_id,
    };
    image = await Image.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(image);
  } catch (err) {
    next(err);
  }
}

async function getImageById(req, res, next) {
  try {
    let image = await Image.findById(req.params.id);
    res.json(image);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllImages,
  addImage,
  deleteImage,
  updateImage,
  getImageById,
};

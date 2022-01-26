const router = require('express').Router();
const upload = require('../helpers/multer');
const {
  getAllImages,
  addImage,
  deleteImage,
  updateImage,
  getImageById,
} = require('../controllers/image.controller');

router.get('/', getAllImages);
router.post('/', upload.single('image'), addImage);
router.delete('/:id', deleteImage);
router.patch('/:id', upload.single('image'), updateImage);
router.get('/:id', getImageById);

module.exports = router;

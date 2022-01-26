const router = require('express').Router();
const {
  getAllTypeOfProjects,
  addTypeOfProjects,
  getTypeOfProjectById,
  updateTypeOfProject,
  deleteTypeOfProject,
} = require('../controllers/typeOfProject.controller');

router.get('/', getAllTypeOfProjects);
router.post('/', addTypeOfProjects);
router.get('/:id', getTypeOfProjectById);
router.patch('/:id', updateTypeOfProject);
router.delete('/:id', deleteTypeOfProject);

module.exports = router;

const router = require('express').Router();
const {
  getAllProjects,
  addProject,
  getProjectById,
  updateProject,
  deleteProject,
} = require('../controllers/project.comtroller');

router.get('/', getAllProjects);
router.post('/', addProject);
router.get('/:id', getProjectById);
router.patch('/:id', updateProject);
router.delete('/:id', deleteProject);

module.exports = router;

const TypeOfProject = require('../models/typeOfProject.model');

function getAllTypeOfProjects(req, res, next) {
  TypeOfProject.find({})
    .populate('projects')
    .then((result) => res.send(result))
    .catch((err) => next(err));
}

function addTypeOfProjects(req, res, next) {
  const typeOfProject = req.body;
  if (!typeOfProject.name || !typeOfProject.description) {
    return next(new Error());
  }

  const newTypeOfProject = TypeOfProject.create(typeOfProject);
  newTypeOfProject.then((result) => res.json(result)).catch((err) => next(err));
}

async function getTypeOfProjectById(req, res, next) {
  if (!req.params.id) {
    return next(new Error('Id not found or invalid'));
  }
  try {
    const typeOfProject = await TypeOfProject.findById(req.params.id);
    res.json(typeOfProject);
  } catch (err) {
    next(err);
  }
}

async function updateTypeOfProject(req, res, next) {
  if (!req.params.id) {
    return next(new Error('Id not found or invalid'));
  }
  try {
    const typeOfProject = await TypeOfProject.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(typeOfProject);
  } catch (err) {
    next(err);
  }
}

async function deleteTypeOfProject(req, res, next) {
  const typeOfProject = await TypeOfProject.findByIdAndDelete(req.params.id);
  try {
    if (typeOfProject) {
      res.status(202).json({ deleteId: req.params.id });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllTypeOfProjects,
  addTypeOfProjects,
  getTypeOfProjectById,
  updateTypeOfProject,
  deleteTypeOfProject,
};

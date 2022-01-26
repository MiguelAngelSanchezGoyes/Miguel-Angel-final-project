const Project = require('../models/project.model');
const User = require('../models/user.model');
const TypeOfProject = require('../models/typeOfProject.model');
const Image = require('../models/image.model');

async function getAllProjects(req, res, next) {
  try {
    const result = await Project.find({})
      .populate('typology', {
        name: 1,
        description: 1,
      })
      .populate('user', {
        name: 1,
        email: 1,
        typeUser: 1,
      })
      .populate('pictures', {
        name: 1,
        avatar: 1,
        cloudinary_id: 1,
      });
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
}

async function addProject(req, res, next) {
  const {
    brand,
    name,
    description,
    viewer,
    blueprints,
    userId,
    typologyId,
    picturesId,
  } = req.body;
  if (!name || !userId) {
    next(new Error('Not found'));
  }
  try {
    console.log(userId);
    const user = await User.findById(userId);
    const typeOfProject = await TypeOfProject.findById(typologyId);
    const image = await Image.findById(picturesId);
    const project = {
      brand,
      name,
      description,
      viewer,
      blueprints,
      user: user._id,
      typology: typeOfProject._id,
      pictures: image._id,
    };

    const newProject = await Project.create(project);

    typeOfProject.projects = [...typeOfProject.projects, newProject._id];
    typeOfProject.save();

    image.projects = [...image.projects, newProject._id];
    image.save();

    user.projects = [...user.projects, newProject._id];
    user.save();
    res.json(newProject);
  } catch (err) {
    next(err);
  }
}

async function getProjectById(req, res, next) {
  if (!req.params.id) {
    return next(new Error('Id not found or invalid'));
  }
  try {
    const project = await Project.findById(req.params.id).populate('typology', {
      name: 1,
      description: 1,
    });
    res.json(project);
  } catch (err) {
    next(err);
  }
}

async function updateProject(req, res, next) {
  if (!req.params.id) {
    return next(new Error('Id not found or invalid'));
  }
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(project);
  } catch (err) {
    next(err);
  }
}

async function deleteProject(req, res, next) {
  const project = await Project.findByIdAndDelete(req.params.id);
  try {
    if (project) {
      res.status(202).json({ deleteId: req.params.id });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllProjects,
  addProject,
  getProjectById,
  updateProject,
  deleteProject,
};

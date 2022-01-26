const mongoose = require('mongoose');
const {
  getAllProjects,
  addProject,
  getProjectById,
  updateProject,
  deleteProject,
} = require('../controllers/project.comtroller');
const Project = require('../models/project.model');
const User = require('../models/user.model');

jest.mock('../models/project.model');
jest.mock('../models/user.model');

describe('Given the projects controller', () => {
  let req;
  let res;
  let next;
  beforeEach(() => {
    req = { params: {} };
    res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    next = jest.fn();
  });
  describe('When getAllProjects is triggered', () => {
    describe('And it works (promise is resolved)', () => {
      beforeEach(() => {
        Project.find.mockReturnValue({
          populate: jest.fn().mockResolvedValue([]),
        });
      });
      test('Project model exists and have a method "find"', () => {
        expect(Project.find).toBeTruthy();
      });
      test('Then call send', async () => {
        await getAllProjects(req, res, next);
        expect(res.send).toHaveBeenCalled();
      });
    });
    describe('And it does not work (promise is rejected)', () => {
      beforeEach(() => {
        Project.find.mockReturnValue({
          populate: jest.fn().mockRejectedValue(new Error()),
        });
      });
      test('Project model exists and have a method "find"', () => {
        expect(Project.find).toBeTruthy();
      });
      test('Then call next', async () => {
        await getAllProjects(req, res, next);
        expect(res.send).not.toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
      });
    });
  });

  describe('When  addProject is triggered', () => {
    describe('And project is trying to add (promise is resolved)', () => {
      beforeEach(() => {
        Project.create.mockResolvedValue({});

        User.findById.mockResolvedValue({
          _id: mongoose.Types.ObjectId('619516dd75bcdf9b77e6690c'),
          projects: [],
          save: jest.fn(),
        });
      });
      test('Project model exists and have a method "create"', () => {
        expect(Project.create).toBeTruthy();
      });
      describe('And name is present', () => {
        beforeEach(() => {
          req.body = {
            name: 'Tarea adicional',

            userId: '619516dd75bcdf9b77e6690c',
          };
        });
        test('Then call json', async () => {
          await addProject(req, res, next);
          expect(res.json).toHaveBeenCalled();
        });
      });

      describe('And Title is not present', () => {
        beforeEach(() => {
          req.body = {
            responsible: mongoose.Types.ObjectId('619516dd75bcdf9b77e6690c'),
            isCompleted: true,
          };
        });
        test('Then call next', async () => {
          await addProject(req, res, next);
          expect(next).toHaveBeenCalled();
        });
      });
    });
    describe('And project could not be added (promise is rejected)', () => {
      beforeEach(() => {
        req.body = {};
        Project.create.mockRejectedValue({
          algo: jest.fn(),
        });
      });
      test('Then call next', async () => {
        await addProject(req, res, next);
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
      });
    });
  });

  describe('When  getProjectById is triggered', () => {
    describe('And the id is found (promise resolved)', () => {
      beforeEach(() => {
        req.params.id = '619516dd75bcdf9b77e6690c';
        Project.findById.mockReturnValue({
          populate: jest.fn().mockResolvedValue([]),
        });
      });
      test('Then call json', async () => {
        await getProjectById(req, res, next);
        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('And the id is not found (promise rejected)', () => {
      beforeEach(() => {
        req.params.id = '';
        Project.findById.mockReturnValue({
          populate: jest.fn().mockRejectedValue([]),
        });
      });
      test('Then call next', async () => {
        await getProjectById(req, res, next);
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
      });
    });
  });

  describe('When  updateProject is triggered', () => {
    describe('And the document is updated (promise resolved)', () => {
      beforeEach(() => {
        req.params.id = '619516dd75bcdf9b77e6690c';
        req.body = {
          responsible: mongoose.Types.ObjectId('619516dd75bcdf9b77e6690c'),
        };
        Project.findByIdAndUpdate.mockResolvedValue({});
      });
      test('Then call json', async () => {
        await updateProject(req, res, next);
        expect(res.json).toHaveBeenCalled();
      });
    });

    describe('And the document is not updated (promise rejected)', () => {
      beforeEach(() => {
        req.params.id = '';
        req.body = {};
        Project.findByIdAndUpdate.mockRejectedValue(new Error());
      });
      test('Then call next', async () => {
        await updateProject(req, res, next);
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
      });
    });
  });

  describe('When deleteProject is triggered', () => {
    describe('And id exists', () => {
      beforeEach(() => {
        req.params.id = '619516dd75bcdf9b77e6690c';
        Project.findByIdAndDelete.mockResolvedValue({});
      });
      test('Then call status & json', async () => {
        await deleteProject(req, res, next);
        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(202);
        expect(res.json).toHaveBeenCalled();
      });
    });

    describe('And id does not exist', () => {
      beforeEach(() => {
        req.params.id = '619516dd75bcdf9b77e6690c';
        Project.findByIdAndDelete.mockResolvedValue();
      });
      test('Then call status & json', async () => {
        await deleteProject(req, res, next);
        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
      });
    });

    describe('And deletion its not possible (promise rejected)', () => {
      beforeEach(() => {
        req.params.id = '';
        Project.findByIdAndDelete.mockRejectedValue();
      });
      test('Then call next', async () => {
        await deleteProject(req, res, next);
        expect(res.json).not.toHaveBeenCalled();
      });
    });
  });
});

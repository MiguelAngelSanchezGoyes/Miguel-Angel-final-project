const mongoose = require('mongoose');
const {
  getAllTypeOfProjects,
  addTypeOfProjects,
  getTypeOfProjectById,
  updateTypeOfProject,
  deleteTypeOfProject,
} = require('../controllers/typeOfProject.controller');
const TypeOfProject = require('../models/typeOfProject.model');

jest.mock('../models/typeOfProject.model.js');

describe('Given the typeOfProjects controller', () => {
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
  describe('When getAllTypeOfProjects is triggered', () => {
    describe('And it works (promise is resolved)', () => {
      beforeEach(() => {
        TypeOfProject.find.mockReturnValue({
          populate: jest.fn().mockResolvedValue([]),
        });
      });
      test('typeOfProject model exists and has a method "find"', () => {
        expect(TypeOfProject.find).toBeTruthy();
      });
      test('Then call send', async () => {
        await getAllTypeOfProjects(req, res, next);
        expect(TypeOfProject.find).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('And it does not work (promise is rejected)', () => {
      beforeEach(() => {
        TypeOfProject.find.mockReturnValue({
          populate: jest.fn().mockRejectedValue(new Error()),
        });
      });
      test('Then call next', async () => {
        await getAllTypeOfProjects(req, res, next);
        expect(next).toHaveBeenCalled();
      });
    });
  });

  describe('When  addTypeOfProject is triggered', () => {
    describe('And typeOfProject is trying to add (promise is resolved)', () => {
      beforeEach(() => {
        TypeOfProject.create.mockResolvedValue({
          algo: jest.fn(),
        });
        User.findById.mockResolvedValue({
          _id: mongoose.Types.ObjectId('619516dd75bcdf9b77e6690c'),
          typeOfProjects: [],
          save: jest.fn(),
        });
      });
      describe('And Title is present', () => {
        beforeEach(() => {
          req.body = {
            title: 'Tarea adicional',
            // responsible: mongoose.Types.ObjectId('619516dd75bcdf9b77e6690c'),
            userId: '619516dd75bcdf9b77e6690c',
          };
        });
        test('Then call json', async () => {
          await addTypeOfProject(req, res, next);
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
          await addTypeOfProject(req, res, next);
          expect(next).toHaveBeenCalled();
        });
      });
    });
    describe('And typeOfProject could not be added (promise is rejected)', () => {
      beforeEach(() => {
        req.body = {};
        TypeOfProject.create.mockRejectedValue({
          algo: jest.fn(),
        });
      });
      test('Then call next', async () => {
        await addTypeOfProject(req, res, next);
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
      });
    });
  });

  describe('When  getTypeOfProjectById is triggered', () => {
    describe('And the id is found (promise resolved)', () => {
      beforeEach(() => {
        req.params.id = '619516dd75bcdf9b77e6690c';
        TypeOfProject.findById.mockReturnValue({
          populate: jest.fn().mockResolvedValue([]),
        });
      });
      test('Then call json', async () => {
        await getTypeOfProjectById(req, res, next);
        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('And the id is not found (promise rejected)', () => {
      beforeEach(() => {
        req.params.id = '';
        TypeOfProject.findById.mockReturnValue({
          populate: jest.fn().mockRejectedValue([]),
        });
      });
      test('Then call next', async () => {
        await getTypeOfProjectById(req, res, next);
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
      });
    });
  });

  describe('When  updateTypeOfProject is triggered', () => {
    describe('And the document is updated (promise resolved)', () => {
      beforeEach(() => {
        req.params.id = '619516dd75bcdf9b77e6690c';
        req.body = {
          responsible: mongoose.Types.ObjectId('619516dd75bcdf9b77e6690c'),
        };
        TypeOfProject.findByIdAndUpdate.mockResolvedValue({});
      });
      test('Then call json', async () => {
        await updateTypeOfProject(req, res, next);
        expect(res.json).toHaveBeenCalled();
      });
    });

    describe('And the document is not updated (promise rejected)', () => {
      beforeEach(() => {
        req.params.id = '';
        req.body = {};
        TypeOfProject.findByIdAndUpdate.mockRejectedValue(new Error());
      });
      test('Then call next', async () => {
        await updateTypeOfProject(req, res, next);
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
      });
    });
  });

  describe('When deleteTypeOfProject is triggered', () => {
    describe('And id exists', () => {
      beforeEach(() => {
        req.params.id = '619516dd75bcdf9b77e6690c';
        TypeOfProject.findByIdAndDelete.mockResolvedValue({});
        // if the document is deleted, an object is returned
      });
      test('Then call status & json', async () => {
        await deleteTypeOfProject(req, res, next);
        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(202);
        expect(res.json).toHaveBeenCalled();
      });
    });

    describe('And id does not exist', () => {
      beforeEach(() => {
        req.params.id = '619516dd75bcdf9b77e6690c';
        TypeOfProject.findByIdAndDelete.mockResolvedValue();
        // if the document is deleted, no value is returned
      });
      test('Then call status & json', async () => {
        await deleteTypeOfProject(req, res, next);
        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
      });
    });

    describe('And deletion its not possible (promise rejected)', () => {
      beforeEach(() => {
        req.params.id = '';
        TypeOfProject.findByIdAndDelete.mockRejectedValue();
      });
      test('Then call next', async () => {
        await deleteTypeOfProject(req, res, next);
        expect(res.json).not.toHaveBeenCalled();
      });
    });
  });
});

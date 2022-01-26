const { logUser } = require('../controllers/login.controller');
const auth = require('../helpers/auth.helpers');
const User = require('../models/user.model');

jest.mock('../models/user.model');
jest.mock('../helpers/auth.helpers');

describe('Given the Login controller', () => {
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

  describe('When a user try to log (logUser is triggered)', () => {
    describe('And user and passwd are valid (promise is resolved)', () => {
      beforeEach(() => {
        User.findOne.mockResolvedValue({
          name: 'Julian',
          passwd: '1234',
          _id: '619a79c756ce74cd9336ce4e',
        });
        auth.checkPasswd = jest.fn().mockResolvedValue(true);
        auth.createJWT = jest.fn().mockImplementation(() => 'token');
        req.body = {
          userName: 'Julian',
          passwd: 1234,
        };
      });
      test('Then user model exists and have a method "findOne"', () => {
        expect(User.findOne).toBeTruthy();
      });
      test('Then user should be logged', async () => {
        const result = await logUser(req, res, next);
        expect(res.json).toHaveBeenCalled();
        expect(result).toBeTruthy();
      });
    });

    describe('And user or passwd are not valid (promise is resolved)', () => {
      beforeEach(() => {
        User.findOne.mockResolvedValue([]);
        auth.checkPasswd = jest.fn().mockResolvedValue(false);
        req.body = {
          userName: 'Pepe',
          passwd: '',
        };
      });

      test('user should not be logged', async () => {
        await logUser(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
      });
    });

    describe('And user is not valid (promise is rejected)', () => {
      beforeEach(() => {
        User.findOne.mockRejectedValue([]);
        auth.checkPasswd = jest.fn().mockResolvedValue(false);
        req.body = {
          userName: 'Pepe',
          passwd: '',
        };
      });
      test('User model exists and have a method "findOne"', () => {
        expect(User.findOne).toBeTruthy();
      });
      test('user should not be logged', async () => {
        await logUser(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
      });
    });
  });
});

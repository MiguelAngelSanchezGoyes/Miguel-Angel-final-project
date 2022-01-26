import axios from 'axios';
import { loadUsers } from './action-creator';

jest.mock('axios');

describe('Given a loadUsers function', () => {
  beforeEach(() => {
    axios.mockResolvedValue({
      data: {
        users: [
          {
            name: 'Mike',
            email: 'mike@isdi.es',
            passwd: '1234',
            typeUser: 'user',
          },
        ],
      },
    });
  });
  test('Then should return an array [of users]', () =>
    loadUsers().then((users) => expect(users).toEqual(['Mike'])));
});

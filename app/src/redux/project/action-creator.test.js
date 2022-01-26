import axios from 'axios';
import { loadProjects } from './action-creator';

jest.mock('axios');

describe('Given a loadUsers function', () => {
  beforeEach(() => {
    axios.mockResolvedValue({
      data: {
        projects: [
          {
            avatar: 'Mike',
          },
        ],
      },
    });
  });
  test('Then should return an array [of users]', () =>
    loadProjects().then((projects) => expect(projects).toEqual(['Mike'])));
});

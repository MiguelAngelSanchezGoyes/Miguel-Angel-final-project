import axios from 'axios';
import { loadImages } from './action-creator';

jest.mock('axios');

describe('Given a loadUsers function', () => {
  beforeEach(() => {
    axios.mockResolvedValue({
      data: {
        pictures: [
          {
            avatar: 'Mike',
          },
        ],
      },
    });
  });
  test('Then should return an array [of users]', () =>
    loadImages().then((pictures) => expect(pictures).toEqual(['Mike'])));
});

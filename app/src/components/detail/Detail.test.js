// test button

import { render } from 'react-dom';
jest.mock('action-creator');
describe('eee', () => {
  const initialState = {
    users: [
      {
        projects: [
          {
            id: '12',
          },
        ],
      },
    ],
  };
  const mockProjects: Projects = {
    id: '12',
  };

  test('qq', () => {
    render(<button>project = {mockProjects}</button>);
    expect();
  });

  describe('er', () => {
    beforeEach(() => {});
    render(<button>project = {mockProjects}</button>, initialState);
    test('qq', () => {
      const deleteButton = screen;
      expect();
    });
  });
});

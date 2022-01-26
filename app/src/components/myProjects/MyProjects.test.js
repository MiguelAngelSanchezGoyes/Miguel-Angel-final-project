import React from 'react';
import { fireEvent, render, screen } from '../../utils/test.utils';
import { MyProjects } from './MyProjects';
import { removeProject } from '../../redux/project/action-creator';
import { projectActionTypes } from '../../redux/project/action-types';

jest.mock('../../redux/project/action-creator', () => ({
  ...jest.requireActual('../../redux/project/action-creator'),
  removeProject: jest.fn(),
}));

describe('Given the FavButton component', () => {
  const initialState = {
    preloadedState: {
      projectStore: [],
    },
  };
  const mockProject = {
    blueprints: 'f',
    brand: 'f',
    description: 'f',
    name: 'f',
    pictures: [
      {
        id: '61b62461d3f9aa7143c366d2',
        avatar:
          'https://res.cloudinary.com/dtdkutsgx/image/upload/v1639326811/r3stxvslfz0lz5d2n2rl.png',
        cloudinaryid: 'r3stxvslfz0lz5d2n2rl',
      },
    ],

    typology: {
      description: 'Web',
      name: 'Web Developer',
      id: '61a798616c16512e20a9dab9',
    },

    user: {
      email: 'l@o.com',
      name: 'Lolo',
      typeUser: 'user',
      id: '61b355875c716bcf5e45c85f',
    },

    viewer: 'f',

    id: '61b624efd3f9aa7143c366dc',
  };
  describe('When the RestaurantCard component is rendered', () => {
    beforeEach(() => {
      const deleted = jest.fn().mockReturnValueOnce(true);
      removeProject.mockReturnValueOnce({
        type: projectActionTypes.remove,
        id: '61b624efd3f9aa7143c366dc',
      });
      render(<MyProjects project={mockProject} />, initialState);
    });
    test('Then name of project should be rendered', () => {
      const deleteButton = screen.getByRole('button');
      fireEvent.click(deleteButton);
      expect(removeProject).toHaveBeenCalled();
    });
  });
});

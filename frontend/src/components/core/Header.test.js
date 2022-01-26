import React from 'react';
import { render, screen, fireEvent } from '../../utils/test.utils';
import Header from './Header';
import { loginOut } from '../../redux/user/action-creator';
import { userActionTypes } from '../../redux/user/action-types';

jest.mock('../../redux/user/action-creator', () => ({
  ...jest.requireActual('../../redux/user/action-creator'),
  loginOut: jest.fn(),
}));

describe('When user logout', () => {
  const initialState = {
    preloadedState: {
      userStore: {
        users: [],
        userLogged: {
          name: 'Mike',
          passwd: '123',
          typeUser: 'user',
        },
      },
    },
  };
  const mockUser = {
    name: 'Mike',
    passwd: '123',
    typeUser: 'user',
  };
  describe('When the Header component is rendered', () => {
    beforeEach(() => {
      loginOut.mockReturnValueOnce({
        type: userActionTypes.logout,
      });
      render(<Header user={mockUser} />, initialState);
    });
    test('Then Header should be rendered', () => {
      const deleteButton = screen.getByTestId('LOGOUT');
      fireEvent.click(deleteButton);
      expect(loginOut).toHaveBeenCalled();
    });
    test('Then LOGIN to be in the document', () => {
      expect(screen.getByText(/LOGOUT/i)).toBeInTheDocument();
    });
    test('Then REGISTER to be in the document', () => {
      expect(screen.getByText(/PROFILE/i)).toBeInTheDocument();
    });
  });
});

describe('Given a Header component', () => {
  describe('When is rendered', () => {
    const initialState = {
      preloadedState: {
        userStore: [],
      },
    };

    beforeEach(() => {
      loginOut.mockReturnValueOnce({
        type: userActionTypes.logout,
      });
      render(<Header />, initialState);
    });
    test('Then Header should be rendered', () => {
      const deleteButton = screen.getByTestId('LOGOUT');
      fireEvent.click(deleteButton);
      expect(loginOut).toHaveBeenCalled();
    });
    test('Then texts should be on the component', () => {
      expect(screen.getByText(/HOME/i)).toBeInTheDocument();
    });

    test('Then PROFILE to be in the document', () => {
      expect(screen.getByText(/REGISTER/i)).toBeInTheDocument();
    });
    test('Then LOGIN to be in the document', () => {
      expect(screen.getByText(/LOGIN/i)).toBeInTheDocument();
    });
  });
});

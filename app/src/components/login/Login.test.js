import React from 'react';
import { fireEvent, render, screen } from '../../utils/test.utils';
import Login from './Login';

describe('Given a Login component', () => {
  describe('When is rendered', () => {
    beforeEach(() => {
      render(<Login />);
    });
    test('Then print login form for user', () => {
      const inputName = screen.getByPlaceholderText('Username');
      const inputPassword = screen.getByPlaceholderText('Password');
      const inputTypeUser = screen.getByPlaceholderText('TypeUser');
      const loginButton = screen.getByRole('button');
      fireEvent.change(inputName, { target: { value: 'Mike' } });
      fireEvent.change(inputPassword, { target: { value: '1234' } });
      fireEvent.change(inputTypeUser, { target: { value: 'user' } });
      expect(inputName.value).toBe('Mike');
      expect(inputPassword.value).toBe('1234');
      expect(inputTypeUser.value).toBe('user');
      fireEvent.click(loginButton);
    });

    test('Then print login form for professional', () => {
      const inputName = screen.getByPlaceholderText('Name');
      const inputPassword = screen.getByPlaceholderText('Password');
      const inputTypeUser = screen.getByPlaceholderText('TypeUser');
      const loginButton = screen.getByRole('button');
      fireEvent.change(inputName, { target: { value: 'Mike' } });
      fireEvent.change(inputPassword, { target: { value: '1234' } });
      fireEvent.change(inputTypeUser, { target: { value: 'professional' } });
      expect(inputName.value).toBe('Mike');
      expect(inputPassword.value).toBe('1234');
      expect(inputTypeUser.value).toBe('professional');
      fireEvent.click(loginButton);
    });
  });
});

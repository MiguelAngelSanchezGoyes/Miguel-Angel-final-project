import { userReducer } from './user-reducer';
import { userActionTypes } from './action-types';

describe('userReducer reducer', () => {
  const initialState = [];
  test('should return the initial state', () => {
    expect(userReducer(undefined, [])).toMatchSnapshot();
  });

  test('should handle userActionTypes.add', () => {
    expect(
      userReducer(initialState, {
        type: userActionTypes.add,
      })
    ).toMatchSnapshot();
  });

  test('should handle userActionTypes.login', () => {
    expect(
      userReducer(initialState, {
        type: userActionTypes.login,
      })
    ).toMatchSnapshot();
  });

  test('should handle userActionTypes.logout', () => {
    expect(
      userReducer(initialState, {
        type: userActionTypes.logout,
      })
    ).toMatchSnapshot();
  });
});

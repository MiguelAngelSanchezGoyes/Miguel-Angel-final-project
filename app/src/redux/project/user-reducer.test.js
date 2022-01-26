import { projectReducer } from './project-reducer';
import { projectActionTypes } from './action-types';

describe('userReducer reducer', () => {
  const initialState = [];
  test('should return the initial state', () => {
    expect(projectReducer(undefined, [])).toMatchSnapshot();
  });

  test('should handle projectReducer.add', () => {
    expect(
      projectReducer(initialState, {
        type: projectActionTypes.add,
      })
    ).toMatchSnapshot();
  });

  test('should handle projectReducer.load', () => {
    expect(
      projectReducer(initialState, {
        type: projectActionTypes.load,
      })
    ).toMatchSnapshot();
  });

  test('should handle projectReducer.update', () => {
    expect(
      projectReducer(initialState, {
        type: projectActionTypes.update,
      })
    ).toMatchSnapshot();
  });

  test('should handle projectReducer.remove', () => {
    expect(
      projectReducer(initialState, {
        type: projectActionTypes.remove,
      })
    ).toMatchSnapshot();
  });
});

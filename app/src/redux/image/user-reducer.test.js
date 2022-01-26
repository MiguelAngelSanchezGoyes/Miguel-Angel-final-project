import { imageReducer } from './image-reducer';
import { imageActionTypes } from './action-types';

describe('userReducer reducer', () => {
  const initialState = [];
  test('should return the initial state', () => {
    expect(imageReducer(undefined, [])).toMatchSnapshot();
  });

  test('should handle imageReducer.add', () => {
    expect(
      imageReducer(initialState, {
        type: imageActionTypes.add,
      })
    ).toMatchSnapshot();
  });

  test('should handle imageReducer.load', () => {
    expect(
      imageReducer(initialState, {
        type: imageActionTypes.load,
      })
    ).toMatchSnapshot();
  });

  test('should handle imageReducer.update', () => {
    expect(
      imageReducer(initialState, {
        type: imageActionTypes.update,
      })
    ).toMatchSnapshot();
  });

  test('should handle imageReducer.remove', () => {
    expect(
      imageReducer(initialState, {
        type: imageActionTypes.remove,
      })
    ).toMatchSnapshot();
  });
});

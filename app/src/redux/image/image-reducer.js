/* eslint-disable no-underscore-dangle */
import { imageActionTypes } from './action-types';

const initialImage = {
  images: [],
  image: {},
};

const imageReducer = (state = initialImage, action) => {
  switch (action.type) {
    case imageActionTypes.load:
      return { ...state, images: [...action.payload] };
    case imageActionTypes.add:
      return { ...state, image: action.payload };
    case imageActionTypes.remove:
      return {
        ...state,
        projects: state.images.filter((item) => item._id !== action.id),
      };
    default:
      return state;
  }
};

export default imageReducer;

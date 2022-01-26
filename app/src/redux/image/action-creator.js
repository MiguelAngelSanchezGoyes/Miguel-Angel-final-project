/* eslint-disable arrow-body-style */
import { imageActionTypes } from './action-types';
import ImageApi from '../../services/cloudinary.service';

export const loadImages = () => {
  return (dispatch) => {
    ImageApi.getImages().then((loaded) => {
      dispatch({
        type: imageActionTypes.load,
        payload: loaded,
      });
    });
  };
};

export const createImage = (image) => {
  return (dispatch) => {
    ImageApi.addImage(image).then((added) => {
      dispatch({
        type: imageActionTypes.add,
        payload: added,
      });
    });
  };
};

export const editImage = (image, id) => {
  return (dispatch) => {
    ImageApi.updateImages(image, id).then((added) => {
      dispatch({
        type: imageActionTypes.add,
        payload: added,
      });
    });
  };
};

export const removeImage = (id) => {
  return (dispatch) => {
    ImageApi.deleteImage(id).then((deleted) => {
      if (+deleted.status === 202) {
        dispatch({
          type: imageActionTypes.remove,
          id,
        });
      }
    });
  };
};

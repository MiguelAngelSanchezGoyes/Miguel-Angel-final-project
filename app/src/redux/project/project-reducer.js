/* eslint-disable no-underscore-dangle */
import { projectActionTypes } from './action-types';

const initialProjectState = {
  projects: [],
};

const projectReducer = (state = initialProjectState, action) => {
  switch (action.type) {
    case projectActionTypes.load:
      return { ...state, projects: [...action.projects] };
    case projectActionTypes.add:
      return { ...state, projects: [...state.projects, action.project] };
    case projectActionTypes.remove:
      return {
        ...state,
        projects: state.projects.filter((item) => item._id !== action.id),
      };
    default:
      return state;
  }
};

export default projectReducer;

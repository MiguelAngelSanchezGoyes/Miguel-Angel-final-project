/* eslint-disable arrow-body-style */
import { projectActionTypes } from './action-types';
import MyApi from '../../services/MyApi';

export const loadProjects = () => {
  return (dispatch) => {
    MyApi.getProjects().then((listProjects) => {
      dispatch({
        type: projectActionTypes.load,
        projects: listProjects,
      });
    });
  };
};

export const createProject = (project) => {
  return (dispatch) => {
    MyApi.addProject(project).then((added) => {
      dispatch({
        type: projectActionTypes.add,
        project: added,
      });
    });
  };
};

export const editProject = (newProject, id) => {
  return (dispatch) => {
    MyApi.updateProjects(newProject, id).then((updated) => {
      dispatch({
        type: projectActionTypes.edit,
        projects: updated,
      });
    });
  };
};

export const removeProject = (id) => {
  return (dispatch) => {
    MyApi.deleteProject(id).then((deleted) => {
      if (+deleted.status === 202) {
        dispatch({
          type: projectActionTypes.remove,
          id,
        });
      }
    });
  };
};

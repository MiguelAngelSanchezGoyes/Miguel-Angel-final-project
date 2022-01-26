/* eslint-disable no-underscore-dangle */
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import projectReducer from './project/project-reducer';
import viewerReducer from './viewer/viewer-reducer';
import userReducer from './user/user-reducer';
import imageReducer from './image/image-reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  combineReducers({
    projectStore: projectReducer,
    viewerStore: viewerReducer,
    userStore: userReducer,
    imageStore: imageReducer,
  }),
  composeEnhancers(applyMiddleware(thunk))
);

/* eslint-disable no-case-declarations */
import { GET_AGGREGATE_PROPERTIES } from './action-types';

const initialState = {
  properties: [],
};

const viewerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AGGREGATE_PROPERTIES:
      const { properties } = action;

      return {
        ...state,
        properties,
      };
    default:
      return state;
  }
};

export default viewerReducer;

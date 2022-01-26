import * as types from './action-types';

export function getViewerProperties(properties = []) {
  // console.log('action', properties)
  return {
    type: types.GET_AGGREGATE_PROPERTIES,
    properties,
  };
}

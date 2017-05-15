import { browserHistory } from 'react-router';
import * as types from './actionTypes';
import structureApi from '../api/structureApi';


const updateStructure = (sequence: string, dotNotation: string) => ({
  type: types.UPDATE_STRUCTURE,
  sequence, 
  dotNotation
});

const updateCustomization = (prop: string, val: string) => ({
  type: types.UPDATE_CUSTOMIZATION,
  prop,
  val
});

const fetchStructureSuccess = (structure: object) => ({
  type: types.FETCH_STRUCTURE_SUCCESS,
  structure
});

const createStructureSuccess = (structure: object) => ({
  type: types.CREATE_STRUCTURE_SUCCESS,
  structure
});

const saveStructureSuccess = (structure: object) => ({
  type: types.SAVE_STRUCTURE_SUCCESS,
  structure
});

const fetchStructure = (id: string) => {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
    return structureApi.getStructure(id).then(structure => {
      dispatch(fetchStructureSuccess(structure));
    }).catch(error => {
      throw(error);
    });
  };
};

const saveStructure = (struct: object) => {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
    return structureApi.saveStructure(struct).then(structure => {
      dispatch(saveStructureSuccess(structure));
    }).catch(error => {
      throw(error);
    });
  };
};

const createStructure = (struct: object) => {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
    return structureApi.createStructure(struct).then(structure => {
      browserHistory.push(`/structure/${structure.id}`);
      dispatch(createStructureSuccess(structure));
    }).catch(error => {
      throw(error);
    });
  };
};

export const actions = {
  updateStructure,
  updateCustomization,
  fetchStructureSuccess,
  createStructureSuccess,
  saveStructureSuccess,
  fetchStructure,
  saveStructure,
  createStructure
}
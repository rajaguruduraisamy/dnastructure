// @flow
import {browserHistory} from 'react-router';
import { createStructuredSelector } from 'reselect';
import assign from 'lodash/assign';

import { State } from 'models/structure';
import * as types from './actions/actionTypes';
import * as structureActions from './actions/structureActions';

// This will be used in our root reducer and selectors

export const NAME = 'structure';

// The initial state for `structure` module

const initialState: State = {
  id: '',
  sequence: 'CAGTCAT',
  dotNotation: '.((.)).',
  colorA: '#f1c40f',
  colorG: '#2ecc71',
  colorC: '#c0392b',
  colorT: '#9b59b6',
  baseSize: 10,
  linkWidth: 30,
  bondWidth: 50,
  // bases: [
  //   {color: '#f1c40f', type: 'A', name: 'Adenine'},
  //   {color: '#2ecc71', type: 'C', name: 'Cytosine'},
  //   {color: '#c0392b', type: 'G', name: 'Guanine'},
  //   {color: '#9b59b6', type: 'T', name: 'Thymine'}
  // ]
};

// Reducer

export default function reducer(state: State = initialState, action: any = {}): State {
  switch (action.type) {
    case types.UPDATE_STRUCTURE: {
      console.log('Updating structure');
      let sequence = action.sequence;
      let dotNotation = action.dotNotation;
      
      return {
        ...state,
        sequence, 
        dotNotation
      };
    }
    case types.UPDATE_CUSTOMIZATION: {
      console.log('Updating customization');
      return {
        ...state,
        [action.prop]: action.val
      }  
    }
    case types.FETCH_STRUCTURE_SUCCESS: {
      console.log('fetch structure');
      return {...state, ...action.structure};
    }
    case types.CREATE_STRUCTURE_SUCCESS: {
      console.log('create structure', action.structure);
      return {...state, ...action.structure};
    }
    case types.SAVE_STRUCTURE_SUCCESS: {
      console.log('save structure', action.structure);
      return {...state, ...action.structure};
    }

    default:
      return state;
  }
}

// Selectors

const structure = (state) => state[NAME];

export const selector = createStructuredSelector({
  structure
});

export const actionCreators = structureActions.actions;

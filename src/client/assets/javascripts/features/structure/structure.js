// @flow

import { createStructuredSelector } from 'reselect';
import assign from 'lodash/assign';

import { State } from 'models/structure';

// Action Types

const UPDATE_STRUCTURE = 'structure/UPDATE_STRUCTURE';
const UPDATE_CUSTOMIZATION = 'structure/UPDATE_CUSTOMIZATION';

// This will be used in our root reducer and selectors

export const NAME = 'structure';

// The initial state for `structure` module

const initialState: State = {
  sequence: 'CAGTCAT',
  dotNotation: '.((.)).',
  colorA: '#f1c40f',
  colorG: '#2ecc71',
  colorC: '#c0392b',
  colorT: '#9b59b6',
  baseSize: '10',
  linkWidth: '30',
  bondWidth: '50'
};

// Reducer

export default function reducer(state: State = initialState, action: any = {}): State {
  switch (action.type) {
    case UPDATE_STRUCTURE: {
      console.log('Updating structure');
      let sequence = action.sequence;
      let dotNotation = action.dotNotation;
      
      return {
        ...state,
        sequence, 
        dotNotation
      };
    }
    case UPDATE_CUSTOMIZATION: {
      console.log('Updating customization');
      let colorC = action.val;
      return {
        ...state,
        [action.prop]: action.val
      }  
    }

    default:
      return state;
  }
}

// Action Creators

const updateStructure = (sequence: string, dotNotation: string) => ({
    type: UPDATE_STRUCTURE,
    sequence, 
    dotNotation
  });

const updateCustomization = (prop: string, val: string) => ({
    type: UPDATE_CUSTOMIZATION,
    prop,
    val
  });

// Selectors

const structure = (state) => state[NAME];

export const selector = createStructuredSelector({
  structure
});

export const actionCreators = {
  updateStructure,
  updateCustomization
};

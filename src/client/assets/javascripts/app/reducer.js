import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import structure, { NAME as structureName } from 'features/structure';

export default combineReducers({
  routing,
  [structureName]: structure
});

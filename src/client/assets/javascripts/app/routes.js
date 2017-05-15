import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from './App';
import StructureView from 'features/structure/components/StructureView';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={StructureView} />
    <Route path="/structure(/:_id)" component={StructureView}/>
  </Route>
);

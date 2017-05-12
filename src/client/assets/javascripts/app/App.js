import React, { PropTypes } from 'react';
import './App.scss';

const App = (props) => (
  <div className="container-fluid">
    {React.cloneElement({...props}.children, {...props})}
  </div>
);

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;

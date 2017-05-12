import React, { Component, PropTypes } from 'react';

import DnaDetails from './DnaDetails/DnaDetails';
import DnaCustomization from './DnaCustomization/DnaCustomization';
import Graph from './DnaGraph/Graph';
import Header from './Header/Header';
import './Structure.scss';

export default class StructureLayout extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    structure: PropTypes.object.isRequired
  };

  render() {
    const { structure, actions } = this.props;

    return (
      <div className="structureApp">
        <Header {...this.props}/>
        <DnaDetails sequence={structure.sequence} dotNotation={structure.dotNotation} actions={actions}/>
        <div className="row graph-container">
          <div className="col-xs-12 col-md-8">
            <Graph {...this.props}/>
          </div>
          <div className="col-xs-6 col-md-4">
            <DnaCustomization {...this.props}/>
         </div>
        </div>
      </div>
    );
  }
}
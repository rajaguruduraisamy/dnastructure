import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators as structureActions, selector } from '../';
import StructureLayout from './StructureLayout';

@connect(selector, (dispatch) => ({
  actions: bindActionCreators(structureActions, dispatch)
}))
export default class StructureView extends Component {
  render() {
    return (
      <div>
        <StructureLayout {...this.props} />
      </div>
    );
  }
}


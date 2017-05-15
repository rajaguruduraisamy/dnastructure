import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators as structureActions, selector } from '../';
import StructureLayout from './StructureLayout';

@connect(selector, (dispatch) => ({
  actions: bindActionCreators(structureActions, dispatch)
}))
export default class StructureView extends Component {

	componentDidMount() {
		if (this.props.params.id) {
			this.props.actions.fetchStructure(this.props.params.id);
			console.log('In structure view ', this.props);
		}
	}
  render() {
    return (
      <div>
        <StructureLayout {...this.props} />
      </div>
    );
  }
}


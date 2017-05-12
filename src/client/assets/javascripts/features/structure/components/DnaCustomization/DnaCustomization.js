import React, { Component, PropTypes } from 'react';
import ColorPicker from '../../../../components/ColorPicker/ColorPicker';

import './DnaCustomization.scss';

export default class DnaCustomization extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    console.log('props are ', props);
    this.state = {
      colorA: this.props.structure.colorA || '#000',
      colorG: this.props.structure.colorG || '#000',
      colorC: this.props.structure.colorC || '#000',
      colorT: this.props.structure.colorT || '#000',
      baseSize: this.props.baseSize|| 5,
      linkWidth: this.props.linkWidth || 5,
      bondWidth: this.props.bondWidth || 5
    };

  }

  handleChangeComplete(type, val) {
    this.setState({ [type]: val });
    this.props.actions.updateCustomization(type, val);
  }

  render() {
    return (
      <div className="customization">
        <label>Customize</label>
        <div className="row">
          <div className="col-md-6">
            <ColorPicker
                color={ this.state.colorA }
                handleColorChange={ this.handleChangeComplete.bind(this, 'colorA') }
                label="A" 
              />
            <ColorPicker
                color={ this.state.colorC }
                handleColorChange={ this.handleChangeComplete.bind(this, 'colorC') }
                label="C"
              />
            <ColorPicker
                color={ this.state.colorG }
                handleColorChange={ this.handleChangeComplete.bind(this, 'colorG') }
                label="G"
              />
            <ColorPicker
                color={ this.state.colorT }
                handleColorChange={ this.handleChangeComplete.bind(this, 'colorT') }
                label="T"
              />
          </div>
          <div className="col-md-6"></div>
        </div>  
      </div>
    );
  }
}

import React, { Component, PropTypes } from 'react';
import ColorPicker from '../../../../components/ColorPicker/ColorPicker';
import NumericInput from '../../../../components/InputNumeric/InputNumeric';

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
      baseSize: this.props.baseSize|| 10,
      linkWidth: this.props.linkWidth || 30,
      bondWidth: this.props.bondWidth || 50,
      //bases : this.props.structure.bases || []
    };

  }

  handleChangeComplete(type, val) {
    //this.state.bases.filter((base) => (base.type === type));
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
                 handleColorChange={ this.handleChangeComplete.bind(this, "colorA") }
                 label="Adenine" 
               />
            <ColorPicker
                 color={ this.state.colorC }
                 handleColorChange={ this.handleChangeComplete.bind(this, "colorC") }
                 label="Cytosine" 
               />
            <ColorPicker
                 color={ this.state.colorG }
                 handleColorChange={ this.handleChangeComplete.bind(this, "colorG") }
                 label="Guanine"
               />
            <ColorPicker
                 color={ this.state.colorT}
                 handleColorChange={ this.handleChangeComplete.bind(this, "colorT") }
                 label="Thymine" 
               />
          </div>
          <div className="col-md-6">
            <NumericInput min={0} max={100} val={this.state.baseSize} label="Base Size" handleValueChange={this.handleChangeComplete.bind(this, "baseSize")}/>
            <NumericInput min={0} max={100} val={this.state.linkWidth} label="Link Size" handleValueChange={this.handleChangeComplete.bind(this, "linkWidth")}/>
            <NumericInput min={0} max={100} val={this.state.bondWidth} label="Bond Size" handleValueChange={this.handleChangeComplete.bind(this, "bondWidth")}/>
          </div>
        </div>  
      </div>
    );
  }
}

import React, { Component, PropTypes } from 'react';
import NumericInput from 'react-numeric-input';

import './InputNumeric.scss';

export default class InputNumeric extends Component {
  static propTypes = {
    handleValueChange: PropTypes.func.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    val: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      min: this.props.min || 0,
      max: this.props.max || 100,
      val: this.props.val || 0,
      label: this.props.label || ''
    };

  }

  handleChange(val)  {
  	console.log('Changing ' , val)
    this.setState({ val })
    this.props.handleValueChange(val);
  };

  render() {
    return (
      <div className="input-numeric form-group">
        <label>{this.state.label}</label>
        <NumericInput className="numeric-input" min={this.state.min} max={this.state.max} size="5" value={this.state.val} onChange={this.handleChange.bind(this)} />
      </div>
    );
  }
}

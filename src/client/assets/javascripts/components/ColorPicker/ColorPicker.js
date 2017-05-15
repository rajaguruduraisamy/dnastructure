import React, { Component, PropTypes } from 'react';
import { SketchPicker } from 'react-color';

import './ColorPicker.scss';

export default class ColorPicker extends Component {
  static propTypes = {
    handleColorChange: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      color: this.props.color || '#fff',
      displayColorPicker: false,
      label: this.props.label || ''
    };

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      color: nextProps.color , label: nextProps.label
    });
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ color: color.hex })
    this.props.handleColorChange(color.hex);
  };

  render() {
    return (
      <div className="colorPicker form-group">
        <label>{this.state.label}</label>
        <div className="swatch" onClick={ this.handleClick }>
          <div className="color" style={ {background: this.state.color} } />
        </div>
        { this.state.displayColorPicker ? <div className="popover">
          <div className="cover" onClick={ this.handleClose }/>
          <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
        </div> : null }

      </div>
    );
  }
}

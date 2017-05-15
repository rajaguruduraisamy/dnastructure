import React, { Component, PropTypes } from 'react';

import './DnaDetails.scss';

export default class DnaDetails extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    sequence: PropTypes.string,
    dotNotation: PropTypes.string
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      sequence: this.props.sequence || '',
      dotNotation: this.props.dotNotation || ''
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      sequence: nextProps.sequence , dotNotation: nextProps.dotNotation
    });
  }

  handleSequenceChange = (e) => {
    let sequence = e.target.value.toUpperCase();
    let reg = /^[ACGT]+$/;
    let valid = reg.test(sequence);    
    
    if (!valid) {
      return;
    }
    
    if (sequence.length === this.state.dotNotation.length) {
      this.props.actions.updateStructure(sequence, this.state.dotNotation);
    } else {
      this.setState({ sequence })
    }
  }

  handleNotationChange = (e) => {
    let dotNotation = e.target.value;
    let reg = /^[.()]+$/;
    let valid = reg.test(dotNotation);    
    
    if (!valid) {
      return;
    }
    
    if (this.state.sequence.length === dotNotation.length) {
      this.props.actions.updateStructure(this.state.sequence, dotNotation);
    } else {
      this.setState({ dotNotation })
    }
  }


  render() {
    return (
      <div className="details">
        <div className="form-group">
          <label>Sequence</label>
          <input
            type="text"
            className="form-control dnaSequence"
            autoFocus="true"
            placeholder="Type the sequence"
            value={this.state.sequence}
            onChange={this.handleSequenceChange} />
        </div>
        <div className="form-group">
          <label>Dot Notation</label>
          <input
          type="text"
          className="form-control dnaNotation"
          placeholder="Type the notation"
          value={this.state.dotNotation}
          onChange={this.handleNotationChange} />
        </div>
      </div>
    );
  }
}

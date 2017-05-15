import React, { Component, PropTypes } from 'react';

import './Header.scss';

export default class Header extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      saving: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({saving: false});
  }

  handleSubmit(e) {
    this.setState({saving: true});
    if (this.props.structure.id) {
      console.log('need to update');
      this.props.actions.saveStructure(this.props.structure);
    } else  {
      this.props.actions.createStructure(this.props.structure);
    }
  }

  render() {
    return (
      <div className="header">
        <h1>DNA STRUCTURE</h1>
        <input
          type="button"
          autoFocus="true"
          className="form-control btn-primary save"
          value={this.state.saving ? 'Saving...' : 'Save'}
          onClick={this.handleSubmit.bind(this)} />
      </div>
    );
  }
}

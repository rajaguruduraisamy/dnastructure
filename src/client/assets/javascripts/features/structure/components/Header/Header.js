import React, { Component, PropTypes } from 'react';

import './Header.scss';

export default class Header extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
  };

  handleSubmit(e) {
    console.log('Saving.....')
  }

  render() {
    return (
      <div className="header">
        <h1>DNA STRUCTURE</h1>
        <input
          type="button"
          autoFocus="true"
          className="form-control btn-primary save"
          value="Save"
          onClick={this.handleSubmit.bind(this)} />
      </div>
    );
  }
}

import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'


export default class HeaderBar extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  };

  render() {
    const { children } = this.props
    return (
      <div className="headerbar">
          {children}
      </div>
    )
  }
}

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'


export default class Footer extends Component {
  static propTypes = {
    location: PropTypes.string.isRequired,
  };

  render() {
    const { location } = this.props
    return (
        <ul className="tabs-footer nav nav-tabs center">
            <li
              className={`footer-link nav-item ${location === '/popular' ? 'active' : ''}`}
              role="navigation"
            >
              <Link className="nav-link" to={`/popular`} activeClassName="active">Popular</Link>
            </li>
            <li
              className={`footer-link nav-item ${location === '/watchlist' ? 'active' : ''}`}
              role="navigation"
            >
              <Link className="nav-link" to={`/watchlist`} activeClassName="active">Watchlist</Link>
            </li>
            <li
              className={`footer-link nav-item ${location === '/search' ? 'active' : ''}`}
              role="navigation"
            >
              <Link className="nav-link" to={`/search`} activeClassName="active">Search</Link>
            </li>
        </ul>
    )
  }
}

Footer = connect()(Footer)

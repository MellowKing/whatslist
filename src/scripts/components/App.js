import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { identity } from 'lodash'

import Footer from './Footer'

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    search: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
    location: PropTypes.object.isRequired,
  };

  render() {
    const { children, location } = this.props
    return (
      <div>
        {children}
        <Footer location={location.pathname}/>
      </div>
    )
  }
}

export default connect(identity)(App)

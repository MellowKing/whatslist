import React, { Component, PropTypes } from 'react'

import SearchForm from '../components/SearchForm'
import { searchByTitle } from '../actions/search'

import { connect } from 'react-redux'
import { identity } from 'lodash'

class Search extends Component {
  static propTypes = {
    search: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  searchByTitle(queryString) {
    this.props.dispatch(searchByTitle(queryString))
  }

  render() {
    return (
      <div className="search-page">
        <SearchForm
          searchByTitle={::this.searchByTitle}
          searchResults={this.props.search}
        />
      </div>
    )
  }
}

export default connect(identity)(Search)
// TODO: WHY OH WHY DO YOU FUCKING NOT WORK HERE, BUT WORK AT TVSHOW.JS?!?
// I must apologize, it didn't work there either :D

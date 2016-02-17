import React, { Component, PropTypes } from 'react'

import SearchList from './SearchList'
import PreviousSearchList from './PreviousSearchList'
import HeaderBar from './HeaderBar'
import Loader from './Loader'


export default class SearchForm extends Component {
  static propTypes = {
    searchByTitle: PropTypes.func.isRequired,
    searchResults: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {
      toggleHistory: false,
    }
  }

  search(event) {
    event.preventDefault()
    this.state = this.setState({
      toggleHistory: false,
    })
    if (this.refs.searchBar.value.trim().length === 0) return;
    if (!navigator.onLine) return
    const queryString = this.refs.searchBar.value
    this.props.searchByTitle(queryString)
    this.addQueryStringToLocalStorage(queryString)
  }

  addQueryStringToLocalStorage(queryString) {
    if (localStorage.previousSearches === undefined) {
      localStorage.previousSearches = JSON.stringify([queryString])
    } else {
      let searches = JSON.parse(localStorage.previousSearches)
      if (searches.indexOf(queryString) > -1) return
      searches.push(queryString)
      if (searches.length > 10) searches = searches.slice(searches.length - 10)
      localStorage.previousSearches = JSON.stringify(searches)
    }
  }

  toggleHistory() {
    this.state = this.setState({
      toggleHistory: !this.state.toggleHistory,
    })
    this.forceUpdate()
  }

  render() {
    const { results, isLoading } = this.props.searchResults.searchByTitle
    return (
      <div>
        <HeaderBar>
          <div className="searchbar-container">
            <form onSubmit={::this.search}>
              <input
                className="searchbar"
                type="search"
                ref="searchBar"
                list="browsers"
                placeholder="search"
                onClick={::this.toggleHistory}
              />
          </form>
          </div>
        </HeaderBar>
        {navigator.onLine ? '' :
          <div className="alert alert-danger" role="alert">
            You don't have an active internet connection.
          </div>}
        {this.state.toggleHistory ?
          <div
            className="container"
            onClick={::this.toggleHistory}
          >
            <PreviousSearchList
              searchByTitle={this.props.searchByTitle}
              previousSearches={JSON.parse(localStorage.previousSearches)}
            />
          </div>
          : '' }
        {!isLoading ? <SearchList searchResults={ results } /> : <Loader />}
      </div>
    )
  }
}

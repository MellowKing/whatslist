import React, { Component, PropTypes } from 'react'

import SearchListItem from './SearchListItem'

export default class SearchList extends Component {
  static propTypes = {
    searchResults: PropTypes.array.isRequired,
  };

  render() {
    const { searchResults } = this.props
    return (
      <div className="container">
        {searchResults
          .map((searchResult) => (
            <SearchListItem
              title={searchResult.name}
              poster={searchResult.poster_path === null ? '' : `http://image.tmdb.org/t/p/w300${searchResult.poster_path}`}
              overview={searchResult.overview}
              showID={searchResult.id}
              key={searchResult.id}
            />
          ))
        }
      </div>
    )
  }
}

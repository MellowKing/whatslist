import React, { Component, PropTypes } from 'react'

export default class SearchListItem extends Component {
  static propTypes = {
    previousSearch: PropTypes.string.isRequired,
    searchByTitle: PropTypes.func.isRequired,
  };

  render() {
    const { previousSearch, searchByTitle } = this.props
    return (
      <div
        className="previous-search-item list-group-item"
        onClick={() => searchByTitle(previousSearch)}
      >
        {previousSearch}
      </div>
    )
  }
}

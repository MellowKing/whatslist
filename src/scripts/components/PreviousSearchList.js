import React, { Component, PropTypes } from 'react'

import PreviousSearchItem from './PreviousSearchItem'

export default class PreviousSearchList extends Component {
  static propTypes = {
    searchByTitle: PropTypes.func.isRequired,
    previousSearches: PropTypes.array.isRequired,
  };

  render() {
    const { previousSearches } = this.props
    return (
      <div>
        <div>
          <h4>search history</h4>
        </div>
        <div className="list-group">
          {previousSearches
            .reverse()
            .map((previousSearch) => (
              <PreviousSearchItem
                previousSearch={previousSearch}
                searchByTitle={this.props.searchByTitle}
                key={previousSearches.indexOf(previousSearch)}
              />
            ))
          }
        </div>
      </div>
    )
  }
}

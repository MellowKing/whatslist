import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { identity } from 'lodash'

import { getPopularTVShowsList } from '../actions/search'
import SearchListItem from '../components/SearchListItem'
import HeaderBar from '../components/HeaderBar'

export default class Popular extends Component {
  static propTypes = {
    search: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.dispatch(getPopularTVShowsList())
  }

  render() {
    const { results, isLoading } = this.props.search.getPopularTVShowsList
    return (
      <div>
        <HeaderBar>
          <div className="page-title"><h2>Popular tv-shows</h2></div>
        </HeaderBar>
        {navigator.onLine ? '' :
          <div className="alert alert-danger" role="alert">
            You don't have an active internet connection.
          </div>}
        <div className="container">
          {isLoading ? '' : results
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
      </div>
    )
  }
}

export default connect(identity)(Popular)

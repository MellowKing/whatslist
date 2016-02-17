import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { identity } from 'lodash'

import { searchByID } from '../actions/supersearch'
import Loader from '../components/Loader'
import TVShowJumbotron from '../components/TVShowJumbotron'


class TVShow extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    search: PropTypes.object.isRequired,
    supersearch: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  };

  componentDidMount() {
    if (!navigator.onLine) return
    this.props.dispatch(searchByID(this.props.params.id))
  }

  render() {
    const results = navigator.onLine ? this.props.supersearch.searchByID.results : JSON.parse(localStorage.tvShows)
    const isLoading = navigator.onLine ? this.props.supersearch.searchByID.isLoading : false
    const searchResults = results[this.props.params.id]
    // console.log(searchResults.seasons.map(season => season.episodes.length))
    return (
      <div>
        {!isLoading && searchResults !== undefined ?
        <TVShowJumbotron
          backdropPath={searchResults.backdrop_path === null ? '' : searchResults.backdrop_path}
          title={searchResults.original_name}
          overview={searchResults.overview}
          id={searchResults.id}
          seasons={searchResults.seasons}
          showData={searchResults}
        />
        : <Loader />}
      </div>
    )
  }
}

export default connect(identity)(TVShow)

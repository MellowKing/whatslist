import React, { Component } from 'react'
import { map } from 'lodash'

import SearchListItem from '../components/SearchListItem'
import HeaderBar from '../components/HeaderBar'

export default class Watchlist extends Component {

  getLocalStorageTVShows() {
    if (localStorage.tvShows === undefined) return [];
    return map(JSON.parse(localStorage.tvShows), (result) => {
      return result
    })
  }
  render() {
    const results = this.getLocalStorageTVShows()
    return (
      <div>
        <HeaderBar>
          <span className="page-title"><h2>Watchlist</h2></span>
        </HeaderBar>
        {navigator.onLine ? '' :
          <div className="alert alert-danger" role="alert">
            You don't have an active internet connection.
          </div>}
        <div className="container">
          {results.length > 0 ? results
            .map((searchResult) => (
              <SearchListItem
                title={searchResult.name}
                poster={searchResult.poster_path === null ? '' : `http://image.tmdb.org/t/p/w300${searchResult.poster_path}`}
                overview={searchResult.overview}
                showID={searchResult.id}
                key={searchResult.id}
              />
            ))
          : `You don't have any tv-shows in your watchlist yet,
           look through popular tv-shows or search to add them.`}
        </div>
      </div>
    )
  }
}

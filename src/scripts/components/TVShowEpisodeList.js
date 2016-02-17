import React, { Component, PropTypes } from 'react'

import { findIndex } from 'lodash'

export default class TVShowEpisodeList extends Component {
  static propTypes = {
    season: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
    seasonNumber: PropTypes.number.isRequired,
  };

  watchedEpisodeToggle(season, episode) {
    if (localStorage.watchedShows === undefined) return;
    const storage = JSON.parse(localStorage.watchedShows)
    const showData = storage[this.props.id]
    if (showData === undefined) return;
    const seasonIndex = findIndex(showData, { season })
    const episodeIndex = findIndex(showData[seasonIndex].episodes, { episode })
    const watched = showData[seasonIndex].episodes[episodeIndex].watched
    showData[seasonIndex].episodes[episodeIndex].watched = !watched
    localStorage.watchedShows = JSON.stringify(storage)
    this.forceUpdate()
  }

  isEpisodeWatched(season, episode) {
    if (localStorage.watchedShows === undefined) return false;
    const storage = JSON.parse(localStorage.watchedShows)
    const showData = storage[this.props.id]
    if (showData === undefined) return false;
    const seasonIndex = findIndex(showData, { season })
    const episodeIndex = findIndex(showData[seasonIndex].episodes, { episode })
    return showData[seasonIndex].episodes[episodeIndex].watched
  }

  render() {
    const { season, seasonNumber } = this.props
    return (
      <div>
        <ul className="list-group">
          {season.episodes
            .map((episode) => (
              <li
                className={`episode-item${this.isEpisodeWatched(seasonNumber, episode.episode_number) ? '--watched' : ''}`}
                key={episode.episode_number}
                onClick={() =>
                  ::this.watchedEpisodeToggle(seasonNumber, episode.episode_number)
                }
              >
                {`Episode: ${episode.episode_number}, ${episode.name}`}
                {this.isEpisodeWatched(seasonNumber, episode.episode_number) ?
                  <span className="glyphicon glyphicon-ok pull-right" aria-hidden="true"/> : ''}
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

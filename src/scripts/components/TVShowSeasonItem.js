import React, { Component, PropTypes } from 'react'

import TVShowEpisodeList from './TVShowEpisodeList'

export default class TVShowSeasonItem extends Component {
  static propTypes = {
    airDate: PropTypes.string.isRequired,
    seasonNumber: PropTypes.number.isRequired,
    season: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  toggleOpenEpisodes() {
    this.state = this.setState({ open: !this.state.open })
  }

  render() {
    const { seasonNumber, season, id } = this.props
    return (
      <div>
        <li
          className={`tv-show-season${this.state.open ? '--open list-group-item' : ' list-group-item'}`}
          onClick={::this.toggleOpenEpisodes}
        >
          <span className="badge">
            {season.episodes !== undefined ? season.episodes.length : '?'}
          </span>
          <h5>{`SEASON ${seasonNumber}`}</h5>
        </li>
        {this.state.open && season.episodes !== undefined ?
          <TVShowEpisodeList
            seasonNumber={seasonNumber}
            id={id}
            season={season}
          /> : ''}
      </div>
    )
  }
}

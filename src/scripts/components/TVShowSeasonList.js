import React, { Component, PropTypes } from 'react'
import TVShowSeasonItem from './TVShowSeasonItem'

export default class TVShowSeasonList extends Component {
  static propTypes = {
    seasons: PropTypes.array.isRequired,
    id: PropTypes.number.isRequired,
  };

  render() {
    const { seasons, id } = this.props
    return (
      <div className="tv-show-season-list-container">
        <ul className="list-group">
          {seasons
            .filter((season) => season.season_number !== 0)
            .filter((season) => season.episodes !== undefined)
            .map((season) => (
              <TVShowSeasonItem
                seasonNumber={season.season_number}
                airDate={season.air_date === null ? 'undefined' : season.air_date}
                key={season.season_number + seasons.indexOf(season)}
                id={id}
                season={season}
              />
            ))}
        </ul>
      </div>
    )
  }
}

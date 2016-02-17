import React, { Component, PropTypes } from 'react'
import { sum, flatten } from 'lodash'

import TVShowSeasonList from './TVShowSeasonList'


export default class TVShowJumbotron extends Component {
  static propTypes = {
    backdropPath: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    seasons: PropTypes.array.isRequired,
    id: PropTypes.number.isRequired,
    showData: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {
      showInStorage: false,
      toggleOpenTitle: true,
    }
  }

  componentWillMount() {
    if (localStorage.tvShows === undefined) return
    const showInStorage = this.props.id in JSON.parse(localStorage.tvShows)
    this.state = this.setState({
      showInStorage,
      toggleOpenTitle: this.state.toggleOpenTitle,
    })
  }

  addShowToLocalStorage() {
    const key = this.props.id;
    if (localStorage.tvShows === undefined) {
      localStorage.tvShows = JSON.stringify({})
    }
    const storage = JSON.parse(localStorage.tvShows)
    storage[key] = this.props.showData
    localStorage.tvShows = JSON.stringify(storage)
    this.state = this.setState({
      showInStorage: true,
      toggleOpenTitle: this.state.toggleOpenTitle,
    })

    if (localStorage.watchedShows === undefined) {
      localStorage.watchedShows = JSON.stringify({})
    }
    const watchedShows = JSON.parse(localStorage.watchedShows)
    watchedShows[key] = []
    this.props.showData.seasons
      .map((season) => {
        watchedShows[key].push({
          season: season.season_number,
          episodes: season.episodes.map((episode) => {
            return {
              episode: episode.episode_number,
              watched: false,
            }
          }),
        })
      })
    localStorage.watchedShows = JSON.stringify(watchedShows)
  }

  removeShowFromLocalStorage() {
    const storage = JSON.parse(localStorage.tvShows)
    delete storage[this.props.id]
    localStorage.tvShows = JSON.stringify(storage)
    this.state = this.setState({
      showInStorage: false,
      toggleOpenTitle: this.state.toggleOpenTitle,
    })
    const watchedShows = JSON.parse(localStorage.watchedShows)
    delete watchedShows[this.props.id]
    localStorage.watchedShows = JSON.stringify(watchedShows)
  }

  toggleOpenTitle() {
    this.state = this.setState({
      showInStorage: this.state.showInStorage,
      toggleOpenTitle: !this.state.toggleOpenTitle,
    })
  }

  getSeenEpisodeCount() {
    if (localStorage.watchedShows === undefined) return 0;
    const storage = JSON.parse(localStorage.watchedShows)
    const showData = storage[this.props.id]
    if (showData === undefined) return 0;
    return sum(flatten(showData
      .filter(season => season.season !== 0)
      .map(season =>
        season.episodes
        .filter(episode => episode.watched)
        .map(() => { return 1 }))))
  }

  getEpisodesToSeeCount() {
    if (localStorage.watchedShows === undefined) return 0;
    const storage = JSON.parse(localStorage.watchedShows)
    const showData = storage[this.props.id]
    if (showData === undefined) return 0;
    return sum(flatten(showData
      .filter(season => season.season !== 0)
      .map(season =>
        season.episodes
        .map(() => { return 1 })))) - this.getSeenEpisodeCount()
  }

  getNextEpisodeAirDate() {
    if (this.props.showData === undefined) return 'N/A'
    const futureEpisodes = flatten(this.props.showData.seasons
      .filter(season => season.episodes !== undefined)
      .map(season =>
        season.episodes
          .filter(episode => { return episode.air_date !== null })
          .map(episode => { return episode.air_date.replace(/-/g, '/') })
      )).filter(date => new Date(date) > Date.now())
    if (futureEpisodes.length > 0) return futureEpisodes[0]
    return 'N/A'
  }

  render() {
    const {
      backdropPath,
      title,
      overview,
      seasons,
      id,
      showData } = this.props
    const nextEpisodeDate = this.getNextEpisodeAirDate()
    const firstAirDate = showData.first_air_date;
    const genres = showData.genres.map((genre) => {return genre.name}).join(', ')
    const episodesSeen = this.getSeenEpisodeCount()
    const episodesToSee = this.getEpisodesToSeeCount()
    return (
      <div>
        <div
          className="jumbotron"
          onClick={::this.toggleOpenTitle}
          style={backdropPath === '' ? { backgroundImage: 'none' } : { backgroundImage: `url(http://image.tmdb.org/t/p/w1000${backdropPath})` }}
        >
          <div className="jumbotron-container">
            <div className="container">
              <h1>{title}</h1>
              {this.state.toggleOpenTitle ?
                <div>
                  <p>{overview}</p>
                  <p>{`First air date: ${firstAirDate}`}</p>
                  <p>{`Genres: ${genres}`}</p>
                  <div>
                    {this.state.showInStorage ?
                    <div>
                      <div>
                        <p>{`Number of episodes seen: ${episodesSeen}`}</p>
                        <p>{`Episodes left to watch: ${episodesToSee}`}</p>
                        <p>{`Next episode air date: ${nextEpisodeDate}`}</p>
                      </div>
                      <input
                        type="button"
                        className="btn btn-primary btn"
                        href="#"
                        role="button"
                        value={'remove'}
                        onClick={::this.removeShowFromLocalStorage}
                      />
                    </div> :
                    <input
                      type="button"
                      className="btn btn-primary"
                      href="#"
                      role="button"
                      value={'add'}
                      onClick={::this.addShowToLocalStorage}
                    />
                    }
                  </div>
                </div>
              : '' }
            </div>
          </div>
        </div>
        { seasons.length > 0 ?
        <TVShowSeasonList
          id={id}
          seasons={seasons}
        />
        : '' }
      </div>
    )
  }
}

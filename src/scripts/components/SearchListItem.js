import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class SearchListItem extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    showID: PropTypes.number.isRequired,
  };

  render() {
    const { title, poster, overview, showID } = this.props
    const listItem = (
      <div className=" tv-show-list-item media">
        <div className="media-left media-middle">
          <div className="circle">
            <img className="media-object" src={poster} alt="..." />
          </div>
        </div>
        <div className="media-body">
          <h5 className="media-heading">{title}</h5>
          {overview}
        </div>
      </div>
    )
    return (
      <Link
        className="search-list-link nav-link"
        to={`/tvshow/${showID}`}
        params={{ id: showID }}
      >
        {listItem}
      </Link>
    )
  }
}

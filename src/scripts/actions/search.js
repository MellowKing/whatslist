import ApiService from '../services/apiService'

/*
 * action types
 */

export const SEARCH_BY_TITLE_IS_LOADING = 'SEARCH_BY_TITLE_IS_LOADING'
export const SEARCH_BY_SHOW_ID_IS_LOADING = 'SEARCH_BY_SHOW_ID_IS_LOADING'
export const SEARCH_BY_SHOW_ID_AND_SEASON_IS_LOADING = 'SEARCH_BY_SHOW_ID_AND_SEASON_IS_LOADING'
export const SEARCH_BY_ID_AND_SEASON_IS_LOADING = 'SEARCH_BY_ID_AND_SEASON_IS_LOADING'
export const GET_POPULAR_TV_SHOW_LIST_IS_LOADING = 'GET_POPULAR_TV_SHOW_LIST_IS_LOADING'
export const SEARCH_BY_TITLE = 'SEARCH_BY_TITLE'
export const SEARCH_BY_SHOW_ID = 'SEARCH_BY_SHOW_ID'
export const SEARCH_BY_SHOW_ID_AND_SEASON = 'SEARCH_BY_SHOW_ID_AND_SEASON'
export const SEARCH_BY_ID_AND_SEASON = 'SEARCH_BY_ID_AND_SEASON'
export const GET_POPULAR_TV_SHOW_LIST = 'GET_POPULAR_TV_SHOW_LIST'

function search(results, type) {
  return { type, results }
}

export function searchByTitle(queryString) {
  return dispatch => {
    dispatch(search([], SEARCH_BY_TITLE_IS_LOADING))
    ApiService.searchByTitleFromTMDB(queryString)
          .then(response => {
            dispatch(search(response.data.results, SEARCH_BY_TITLE))
          })
  }
}

export function searchByShowID(id) {
  return dispatch => {
    dispatch(search({}, SEARCH_BY_SHOW_ID_IS_LOADING))
    ApiService.searchByTVShowId(id)
      .then(response => {
        dispatch(search(response.data, SEARCH_BY_SHOW_ID))
      })
  }
}

export function searchByTVShowIDAndSeason(id, season) {
  return dispatch => {
    dispatch(search([], SEARCH_BY_SHOW_ID_AND_SEASON_IS_LOADING))
    ApiService.searchByTVShowIDAndSeason(id, season)
      .then(response => {
        dispatch(search(response.data, SEARCH_BY_SHOW_ID_AND_SEASON))
      })
  }
}

export function getPopularTVShowsList() {
  return dispatch => {
    dispatch(search([], GET_POPULAR_TV_SHOW_LIST_IS_LOADING))
    ApiService.getPopularTVShowsList()
          .then(response => {
            dispatch(search(response.data.results, GET_POPULAR_TV_SHOW_LIST))
          })
  }
}

export function searchByIDAndSeason(id, season) {
  return dispatch => {
    dispatch(search({}, SEARCH_BY_ID_AND_SEASON_IS_LOADING))
    ApiService.searchByTVShowIDAndSeason(id, season)
      .then(response => {
        dispatch(search(
          {
            id,
            season,
            air_date: response.data.air_date,
            episodes: response.data.episodes,
          },
          SEARCH_BY_ID_AND_SEASON))
      })
  }
}

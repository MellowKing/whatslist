import ApiService from '../services/apiService'

export const SEARCH_BY_ID = 'SEARCH_BY_ID'
export const SEARCH_BY_SEASON = 'SEARCH_BY_SEASON'
export const IS_LOADING = 'IS_LOADING'
export const IS_NOT_LOADING = 'IS_NOT_LOADING'

function search(results, type) {
  return { type, results }
}

export function searchByID(id) {
  return dispatch => {
    dispatch(search({}, IS_LOADING))
    ApiService.searchByTVShowId(id)
      .then(response => {
        dispatch(
          search(response.data, SEARCH_BY_ID)
        )
        dispatch(search({}, IS_NOT_LOADING))
        response.data.seasons.map(
          (season) => {
            ApiService.searchByTVShowIDAndSeason(id, season.season_number)
              .then(response2 => {
                dispatch(
                  search({
                    id,
                    season: season.season_number,
                    episodes: response2.data,
                  }, SEARCH_BY_SEASON)
                )
              })
          }
        )
      })
  }
}

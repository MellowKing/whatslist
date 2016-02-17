import {
  SEARCH_BY_TITLE,
  SEARCH_BY_SHOW_ID,
  SEARCH_BY_SHOW_ID_AND_SEASON,
  SEARCH_BY_ID_AND_SEASON,
  SEARCH_BY_TITLE_IS_LOADING,
  SEARCH_BY_SHOW_ID_IS_LOADING,
  SEARCH_BY_SHOW_ID_AND_SEASON_IS_LOADING,
  SEARCH_BY_ID_AND_SEASON_IS_LOADING,
  GET_POPULAR_TV_SHOW_LIST,
  GET_POPULAR_TV_SHOW_LIST_IS_LOADING,
} from '../actions/search'

import { combineReducers } from 'redux'

function searchByTitle(state = { results: [], isLoading: false }, result) {
  switch (result.type) {
    case SEARCH_BY_TITLE: {
      return {
        results: result.results,
        isLoading: false,
      }
    }
    case SEARCH_BY_TITLE_IS_LOADING: {
      return {
        results: state.results,
        isLoading: true,
      }
    }
    default:
      return {
        results: state.results,
        isLoading: false,
      }
  }
}

function searchByShowID(state = { results: {}, isLoading: false }, result) {
  switch (result.type) {
    case SEARCH_BY_SHOW_ID: {
      return {
        results: result.results,
        isLoading: false,
      }
    }
    case SEARCH_BY_SHOW_ID_IS_LOADING: {
      return {
        results: {},
        isLoading: true,
      }
    }
    default:
      return {
        results: state.results,
        isLoading: false,
      }
  }
}


function searchByTVShowIDAndSeason(state = { results: [], isLoading: false }, result) {
  switch (result.type) {
    case SEARCH_BY_SHOW_ID_AND_SEASON: {
      return {
        results: state.results.concat(result.results),
        isLoading: false,
      }
    }
    case SEARCH_BY_SHOW_ID_AND_SEASON_IS_LOADING: {
      return {
        results: [],
        isLoading: true,
      }
    }
    default:
      return {
        results: [],
        isLoading: false,
      }
  }
}

function getPopularTVShowsList(state = { results: [], isLoading: false }, result) {
  switch (result.type) {
    case GET_POPULAR_TV_SHOW_LIST: {
      return {
        results: result.results,
        isLoading: false,
      }
    }
    case GET_POPULAR_TV_SHOW_LIST_IS_LOADING: {
      return {
        results: [],
        isLoading: true,
      }
    }
    default:
      return {
        results: state.results,
        isLoading: false,
      }
  }
}

function searchByIDAndSeason(state = { results: {}, isLoading: false }, result) {
  switch (result.type) {
    case SEARCH_BY_ID_AND_SEASON: {
      const key = result.results.id
      const value = result.results
      if (key in state.results) {
        state.results[key].push(value)
      } else {
        state.results[key] = [value]
      }
      return {
        results: state.results,
        isLoading: false,
      }
    }
    case SEARCH_BY_ID_AND_SEASON_IS_LOADING: {
      return {
        results: state.results,
        isLoading: true,
      }
    }
    default:
      return {
        results: state.results,
        isLoading: false,
      }
  }
}

const search = combineReducers({
  searchByTitle,
  searchByShowID,
  searchByTVShowIDAndSeason,
  searchByIDAndSeason,
  getPopularTVShowsList,
})

export default search

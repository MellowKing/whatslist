import {
  SEARCH_BY_ID,
  SEARCH_BY_SEASON,
  IS_LOADING,
  IS_NOT_LOADING,
} from '../actions/supersearch'

import { combineReducers } from 'redux'

function searchByID(state = { results: {}, isLoading: false }, result) {
  switch (result.type) {
    case SEARCH_BY_ID: {
      const newState = state.results
      newState[result.results.id] = result.results
      return {
        results: newState,
        isLoading: state.isLoading,
      }
    }
    case SEARCH_BY_SEASON: {
      const newState = state.results
      const id = result.results.id
      const season = result.results.season
      const episodes = result.results.episodes
      newState[id].seasons[season] = episodes
      return {
        results: newState,
        isLoading: state.isLoading,
      }
    }
    case IS_LOADING: {
      return {
        results: state.results,
        isLoading: true,
      }
    }
    case IS_NOT_LOADING: {
      return {
        results: state.results,
        isLoading: false,
      }
    }
    default:
      return {
        results: state.results,
        isLoading: state.isLoading,
      }
  }
}

const supersearch = combineReducers({
  searchByID,
})

export default supersearch

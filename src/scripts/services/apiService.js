import { get } from 'axios'

export default class ApiService {
  static searchByTitleFromOMDB(queryString) {
    return get('http://www.omdbapi.com', {
      params: {
        queryString,
        type: 'series',
        plot: 'short',
      },
    })
  }

  static searchByTitleFromTMDB(queryString) {
    return get('https://api.themoviedb.org/3/search/tv', {
      params: {
        api_key: 'f6c71577c772a19c0f04b7bcefa04794',
        query: queryString,
      },
    })
  }

  static searchByTVShowId(id) {
    return get(`https://api.themoviedb.org/3/tv/${id}`, {
      params: {
        api_key: 'f6c71577c772a19c0f04b7bcefa04794',
      },
    })
  }

  static searchByTVShowIDAndSeason(id, season) {
    return get(`https://api.themoviedb.org/3/tv/${id}/season/${season}`, {
      params: {
        api_key: 'f6c71577c772a19c0f04b7bcefa04794',
      },
    })
  }

  static getPopularTVShowsList() {
    return get(`https://api.themoviedb.org/3/tv/popular`, {
      params: {
        api_key: 'f6c71577c772a19c0f04b7bcefa04794',
      },
    })
  }
}

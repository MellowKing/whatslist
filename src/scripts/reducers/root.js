import { combineReducers } from 'redux'

import search from './search';
import supersearch from './supersearch';

export default combineReducers({ search, supersearch })

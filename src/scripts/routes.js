import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Popular from './pages/Popular';
import Search from './pages/Search';
import Watchlist from './pages/Watchlist';
import TVShow from './pages/TVShow';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Watchlist} />
    <Route path="popular" component={Popular} />
    <Route path="watchlist" component={Watchlist} />
    <Route path="search" component={Search} />
    <Route path="tvshow/:id" component={TVShow} />
  </Route>
);

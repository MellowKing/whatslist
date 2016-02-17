import React from 'react'
import { render } from 'react-dom'
import { compose, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { identity } from 'lodash'
import thunk from 'redux-thunk'
import rootReducer from './reducers/root'
import routes from './routes';
import { Router, browserHistory } from 'react-router';
import routerContainer from './routerContainer';
require('offline-plugin/runtime').install();

function main() {
  const target = document.getElementById('main')
  const devTools = window.devToolsExtension ? window.devToolsExtension() : identity
  const finalCreateStore = compose(applyMiddleware(thunk), devTools)(createStore)
  const store = finalCreateStore(rootReducer)
  routerContainer.set(
    render(
      <Provider store={store}>
        <Router
          history={browserHistory}
        >
          {routes}
        </Router>
      </Provider>, target));
}

main()

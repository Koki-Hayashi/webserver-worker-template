// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory, Router } from 'react-router';
import routes from './routes';

import store from './store/store';

import init from './init/initService';

init();

const history = syncHistoryWithStore(browserHistory, store);

const content = document.getElementById('content');
if (!content) {
  throw new Error("Element with id 'content' should exist");
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  content
);

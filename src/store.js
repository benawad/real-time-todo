import { createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router'

import createSagaMiddleware from 'redux-saga'
import mySaga from './sagas/sagas'

import rootReducer from './reducers/index';

import superagent from 'superagent';
import feathers from 'feathers-client';
import rest from 'feathers-rest/client';
import io from 'socket.io-client';

const defaultState = {};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, defaultState, applyMiddleware(sagaMiddleware));

const host = 'http://localhost:3030';

const restApp = feathers()
  .configure(rest(host).superagent(superagent))
  .configure(feathers.hooks())

const itemsSerivce = restApp.service('items');

export const socketApp = feathers()
  .configure(feathers.socketio(io(host)))
  .configure(feathers.hooks())

sagaMiddleware.run(mySaga, itemsSerivce)

export const history = syncHistoryWithStore(browserHistory, store);

export default store;


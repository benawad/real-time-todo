import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import handleItems from './item';

const rootReducer = combineReducers({items: handleItems, routing: routerReducer});

export default rootReducer;

const template = `
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  routing: routerReducer,
  // Add app reducers here
});

export default rootReducer;`;

export default template;

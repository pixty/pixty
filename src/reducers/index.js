import { combineReducers } from 'redux';

import scene from './scene';
import modals from './modals';
import orgs from './orgs';
import settings from './settings';

const reducer = combineReducers({
  scene,
  modals,
  orgs,
  settings
});

export default reducer;
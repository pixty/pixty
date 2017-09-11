import { combineReducers } from 'redux'

import users from './users'
import scene from './scene'
import persons from './persons'
import pictures from './pictures'
import profiles from './profiles'
import cameras from './cameras'
import modals from './modals'
import orgs from './orgs'

const reducer = combineReducers({
  //users,
  scene,
  //persons,
  //pictures,
  //profiles,
  //cameras,
  modals,
  orgs
});

export default reducer
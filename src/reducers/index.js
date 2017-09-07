import { combineReducers } from 'redux'

import users from './users'
import scenes from './scenes'
import persons from './persons'
import pictures from './pictures'
import profiles from './profiles'
import cameras from './cameras'
import modals from './modals'

const reducer = combineReducers({
  users,
  scenes,
  persons,
  pictures,
  profiles,
  cameras,
  modals
});

export default reducer
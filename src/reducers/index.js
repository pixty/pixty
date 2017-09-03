import { combineReducers } from 'redux'

import users from './users'
import scenes from './scenes'
import persons from './persons'
import pictures from './pictures'
import profiles from './profiles'
import cameras from './cameras'

const reducer = combineReducers({
  users,
  scenes,
  persons,
  pictures,
  profiles,
  cameras
});

export default reducer
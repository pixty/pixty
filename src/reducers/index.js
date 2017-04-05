import { combineReducers } from 'redux'

import users from './users'
import scenes from './scenes'
import persons from './persons'
import pictures from './pictures'
import profiles from './profiles'

const reducer = combineReducers({
  users,
  scenes,
  persons,
  pictures,
  profiles
});

export default reducer
import { ADD_ENTITIES, CLICK_USERS, USER } from '../actions';
import _ from 'lodash';
//import { userSchema } from '../api/schema'

//export const STATE_KEY = 'users'

const user = (state, action) => {
  switch (action.type) {
    case CLICK_USERS:

      if (state.id !== action.id) {
        return state;
      }
      
      return {
        ...state,
        selected: !state.selected
      };
    default:
      return state;
  }
};

export default function reducer(state = {}, action) {

  switch (action.type) {

    case USER.SUCCESS:      
      return {
        ...state,
        ...action.response.entities.users
      };

    case ADD_ENTITIES:      
      return {
        ...state,
        ...action.payload.responce
      };

    case CLICK_USERS: {
       return _.mapValues(state, (u) => user(u, action));
    }

    default:
      return state;
  }
}

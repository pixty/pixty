import { SET_SETTINGS } from '../actions';

export default function reducer(state = {}, action) {

  switch (action.type) {

    case SET_SETTINGS:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
}
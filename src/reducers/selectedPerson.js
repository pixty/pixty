import { CLICK_PERSONS } from '../actions';

export default function selectedPersonReducer(state = {}, action) {

  switch (action.type) {

    case CLICK_PERSONS:
      console.log('CLICK_PERSONS', action);
      if (state.id === action.payload.id) {
        return {};
      } else {
        return {
          ...state,
          ...action.payload.selected
        };
      }
    default:
      return state;
  }
}
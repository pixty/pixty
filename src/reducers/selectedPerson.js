import { CLICK_PERSONS } from '../actions';

export default function selectedPersonReducer(state = {}, action) {

  switch (action.type) {

    case CLICK_PERSONS:
      if (state.id === action.payload.id) {
        return { ...state, selected: !state.selected };
      } else {
        return {
          ...state,
          ...action.payload.selected,
          selected: true
        };
      }
    default:
      return state;
  }
}
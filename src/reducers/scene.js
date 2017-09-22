import { isEqual } from 'lodash';
import { SCENE } from '../actions';

export default function reducer(state = {}, action) {

  switch (action.type) {

    case SCENE.SUCCESS:
      if (isEqual(action.response, state)) {
        return state;
      }

      return {
        ...state,
        ...action.response
      };

    default:
      return state;
  }
}
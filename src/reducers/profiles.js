import { SCENE, PROFILE } from '../actions';

export default function reducer(state = {}, action) {

  switch (action.type) {

    case PROFILE.FAILURE:
      alert('POST PROFILE.FAILURE');
      return state;

    case PROFILE.SUCCESS:

      return { ...state, ...{ [action.id] : { ...action.response }}};

    case SCENE.SUCCESS:
      return {
        ...state,
        ...action.response.entities.profiles
      };

    default:
      return state;
  }
}
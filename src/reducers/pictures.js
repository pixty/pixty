import { SCENE } from '../actions'

export default function reducer(state = {}, action) {

  switch (action.type) {

    case SCENE.SUCCESS:      
      return {
        ...state,
        ...action.response.entities.pictures
      }

    default:
      return state
  }
}
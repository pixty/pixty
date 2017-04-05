import { SCENE } from '../actions'

export default function reducer(state = {}, action) {

  switch (action.type) {

    case SCENE.SUCCESS:      
      return {
        ...state,
        ...action.response.entities.persons
      }

    default:
      return state
  }
}
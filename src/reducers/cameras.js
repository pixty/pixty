import { CAMERA, GET_CAMERAS } from '../actions'

export default function reducer(state = {}, action) {

  switch (action.type) {

    case CAMERA.SUCCESS:
      return {
        ...state,
        ...action.response
      }

    default:
      return state
  }
}
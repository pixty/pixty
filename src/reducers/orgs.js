import { ORGS } from '../actions'
import { CurrentUser } from '../api'

export default function reducer(state = {}, action) {

  switch (action.type) {

    case ORGS.SUCCESS:

      CurrentUser.setCamera(action.response[0].cameras[0].id);
      return {
        ...state,
        ...action.response
      }

    default:
      return state
  }
}
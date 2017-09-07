import { OPEN_MODAL, CLOSE_MODAL } from '../actions'

export default function reducer(state = {}, action) {

  switch (action.type) {

    case OPEN_MODAL:
      return {
        ...state,
        ...{[action.dialog] : { id: action.dialog, open: true, context: action.obj }}
      }

    case CLOSE_MODAL:
      return {
        ...state,
        ...{[action.dialog] : {open: false}}
      }

    default:
      return state
  }
}
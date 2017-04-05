export const ADD_ENTITIES = 'ADD_ENTITIES'
export const CLICK_USERS = 'CLICK_USERS'
export const LOAD_USER_PAGE = 'LOAD_USER_PAGE'
export const LOAD_SCENE = 'LOAD_SCENE'

const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`
    return acc
  }, {})
}

export const USER = createRequestTypes('USER')
export const SCENE = createRequestTypes('SCENE')

export const addEntities = (entities) => ({
  type: ADD_ENTITIES,
  payload: entities
});

export const clickUser = (id) => ({
  type: CLICK_USERS,
  id
})

function action(type, payload = {}) {
  return {type, ...payload}
}

export const user = {
  request: login => action(USER.REQUEST, {login}),
  success: (login, response) => action(USER.SUCCESS, {login, response}),
  failure: (login, error) => action(USER.FAILURE, {login, error}),
}

export const scene = {
  request: login => action(SCENE.REQUEST, {login}),
  success: (login, response) => action(SCENE.SUCCESS, {login, response}),
  failure: (login, error) => action(SCENE.FAILURE, {login, error}),
}


export const loadUserPage = (login, requiredFields = []) => action(LOAD_USER_PAGE, {login, requiredFields})
export const loadScene = (login, requiredFields = []) => action(LOAD_SCENE, {login, requiredFields})
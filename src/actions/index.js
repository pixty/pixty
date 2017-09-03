export const ADD_ENTITIES = 'ADD_ENTITIES'
export const CLICK_USERS = 'CLICK_USERS'
export const CLICK_PERSONS = 'CLICK_PERSONS'
export const LOAD_USER_PAGE = 'LOAD_USER_PAGE'
export const LOAD_SCENE = 'LOAD_SCENE'
export const POST_PROFILE = 'POST_PROFILE'
export const GET_CAMERAS = 'GET_CAMERAS'
export const GET_PROFILE = 'GET_PROFILE'

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
export const CAMERA = createRequestTypes('CAMERA')
export const PROFILE = createRequestTypes('PROFILE')

export const addEntities = (entities) => ({
  type: ADD_ENTITIES,
  payload: entities
});

export const clickUser = (id) => ({
  type: CLICK_USERS,
  id
})

export const clickPerson = (payload) => ({
  type: CLICK_PERSONS,
  payload: payload
})


function action(type, payload = {}) {
  return {type, ...payload}
}

export const user = {
  request: login => action(USER.REQUEST, {login}),
  success: (login, response) => action(USER.SUCCESS, {login, response}),
  failure: (login, error) => action(USER.FAILURE, {login, error}),
}

export const profile = {
  request: login => action(PROFILE.REQUEST, {profile}),
  success: (login, response) => action(PROFILE.SUCCESS, {profile, response}),
  failure: (login, error) => action(PROFILE.FAILURE, {profile, error}),
}

export const get_profile = {
  request: id => action(PROFILE.REQUEST, {id}),
  success: (id, response) => action(PROFILE.SUCCESS, {id, response}),
  failure: (id, error) => action(PROFILE.FAILURE, {id, error}),
}

export const scene = {
  request: login => action(SCENE.REQUEST, {login}),
  success: (login, response) => action(SCENE.SUCCESS, {login, response}),
  failure: (login, error) => action(SCENE.FAILURE, {login, error}),
}

export const camera = {
  request: () => action(CAMERA.REQUEST, {}),
  success: (id, response) => action(CAMERA.SUCCESS, {id, response}),
  failure: (id, error) => action(CAMERA.FAILURE, {id, error}),
}


export const loadUserPage = (login, requiredFields = []) => action(LOAD_USER_PAGE, {login, requiredFields})
export const loadScene = (login, requiredFields = []) => action(LOAD_SCENE, {login, requiredFields})
export const postProfile = (profile) => action(POST_PROFILE, {profile})
export const getCameras = (id) => action(GET_CAMERAS, {id})
export const getProfile = (id) => action(GET_PROFILE, {id})



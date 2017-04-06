/* eslint-disable no-constant-condition */
import { take, put, call, fork, select } from 'redux-saga/effects'
import * as api from '../api'
import * as actions from '../actions'
import { getUser } from '../reducers/selectors'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { browserHistory } from 'react-router'
export const history = browserHistory

// each entity defines 3 creators { request, success, failure }
const { user, scene } = actions

// Utility function to delay effects
function delay(millis) {  
    const promise = new Promise(resolve => {
        setTimeout(() => resolve(true), millis)
    });
    return promise;
}


/***************************** Subroutines ************************************/

// resuable fetch Subroutine
// entity :  user | repo | starred | stargazers
// apiFn  : api.fetchUser | api.fetchRepo | ...
// id     : login | fullName
// url    : next page url. If not provided will use pass it to apiFn
function* fetchEntity(entity, apiFn, id, url) {
  yield put(showLoading())
  yield put( entity.request(id) )
  const {response, error} = yield call(apiFn, url || id)
  if(response)
    yield put( entity.success(id, response) )
  else
    yield put( entity.failure(id, error) )
  yield put(hideLoading())
}

// yeah! we can also bind Generators
export const fetchUser       = fetchEntity.bind(null, user, api.fetchUser)
export const fetchScene       = fetchEntity.bind(null, scene, api.fetchScene)

// Fetch data every N seconds                                           
function* pollData() {  
    try {        
        yield call(delay, 20000)
        yield call(fetchScene, 'pixty')
    } catch (error) {        
        return
    }
}

// load user unless it is cached
function* loadUser(login, requiredFields) {
  const user = yield select(getUser, login)
  if (!user || requiredFields.some(key => !user.hasOwnProperty(key))) {
    yield call(fetchUser, login)
  }
}

function* watchLoadUserPage() {
  while(true) {
    const {login, requiredFields = []} = yield take(actions.LOAD_USER_PAGE)

    yield fork(loadUser, login, requiredFields)
  }
}

function* watchLoadScene() {
  while(true) {
    const {orgId} = yield take(actions.LOAD_SCENE)

    yield call(fetchScene, orgId)
  }
}

// Wait for successful response, then fire another request
// Cancel polling if user logs out                                         
function* watchPollData() {  
    while (true) {             
        yield call(pollData)        
    }
}

export default function* root() {
  yield [
    fork(watchPollData),
    fork(watchLoadUserPage),
    fork(watchLoadScene)
  ]
}
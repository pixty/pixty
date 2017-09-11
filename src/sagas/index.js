/* eslint-disable no-constant-condition */
import { take, put, call, fork, select } from 'redux-saga/effects'
import * as api from '../api'
import * as actions from '../actions'
import { getUser } from '../reducers/selectors'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { browserHistory } from 'react-router'
import { CurrentUser } from '../api'
export const history = browserHistory

// each entity defines 3 creators { request, success, failure }
const { user, scene, profile, get_profile, orgs } = actions

// Utility function to delay effects
function delay(millis) {
    const promise = new Promise(resolve => {
        setTimeout(() => resolve(true), millis)
    });
    return promise;
}


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
export const fetchUser        = fetchEntity.bind(null, user, api.fetchUser)
export const fetchScene       = fetchEntity.bind(null, scene, api.fetchScene)
export const postProfile      = fetchEntity.bind(null, profile, api.postProfile)
export const fetchProfile     = fetchEntity.bind(null, get_profile, api.fetchProfile)
export const fetchOrgs        = fetchEntity.bind(null, orgs, api.fetchOrgs)

// Fetch data every N seconds
function* pollData() {
    try {
        const camera_id = CurrentUser.getCamera();
        if (camera_id) {
          yield call(fetchScene, camera_id);
        }
        yield call(delay, 1000);
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

function* watchGetOrgs() {
  while(true) {
    const {id} = yield take(actions.GET_ORGS)
    yield call(fetchOrgs, id)
  }
}

function* watchGetProfile() {
  while(true) {
    const {id} = yield take(actions.GET_PROFILE)
    yield call(fetchProfile, 1) //1 for test, need id var
  }
}

function* watchLoadScene() {
  while(true) {
    const {login, requiredFields = []} = yield take(actions.LOAD_SCENE)
    yield call(fetchScene, login)
  }
}

function* watchPostProfile() {
  while(true) {
    const {profile} = yield take(actions.POST_PROFILE)
    yield call(postProfile, profile)
  }
}

// Wait for successful response, then fire another request
// Cancel polling if user logs out
function* watchPollData() {

    while (CurrentUser.loggedIn()) {
        yield call(pollData)
    }
}

export default function* root() {
  yield [
    fork(watchGetOrgs),
    fork(watchPollData),
    fork(watchGetProfile),
    fork(watchPostProfile),
  ]
}
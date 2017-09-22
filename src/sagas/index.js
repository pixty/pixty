/* eslint-disable no-constant-condition */
import { take, put, call, fork } from 'redux-saga/effects';
import * as api from '../api';
import * as actions from '../actions';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { browserHistory } from 'react-router';
import { CurrentUser } from '../api';
export const history = browserHistory;

// each entity defines 3 creators { request, success, failure }
const { user, scene, profile, get_profile, orgs } = actions;
const SCAN_DELAY = 1000;

// Utility function to delay effects
function delay(millis) {
    const promise = new Promise(resolve => {
        setTimeout(() => resolve(true), millis);
    });
    return promise;
}

function* fetchEntity(entity, apiFn, id, url) {

  yield put(showLoading());
  yield put( entity.request(id) );
  const {response, error} = yield call(apiFn, url || id);
  if(response)
    yield put( entity.success(id, response) );
  else
    yield put( entity.failure(id, error) );
  yield put(hideLoading());
}

// Bind Generators
export const fetchUser        = fetchEntity.bind(null, user, api.fetchUser);
export const fetchScene       = fetchEntity.bind(null, scene, api.fetchScene);
export const postProfile      = fetchEntity.bind(null, profile, api.postProfile);
export const fetchProfile     = fetchEntity.bind(null, get_profile, api.fetchProfile);
export const fetchOrgs        = fetchEntity.bind(null, orgs, api.fetchOrgs);

// Fetch data every SCAN_DELAY seconds
function* pollData() {
    try {
        const camera_id = CurrentUser.getCamera();
        if (camera_id) {
          yield call(fetchScene, camera_id);
        }
        yield call(delay, SCAN_DELAY);
    } catch (error) {
        CurrentUser.setCamera(null);
        return;
    }
}

function* watchGetOrgs() {

  try {
    while(true) {
      yield take(actions.GET_ORGS);
      yield call(fetchOrgs, {});
    }
  } catch(error) {

    if (error.status === 401) {
      CurrentUser.logOut();
      window.location.reload();
    }
    return;
  }
}

function* watchGetProfile() {
  try {
    while(true) {
      const {id} = yield take(actions.GET_PROFILE);
      yield call(fetchProfile, id);
    }
  } catch(error) {

    if (error.status === 401) {
      CurrentUser.logOut();
      window.location.reload();
    }
    return;
  }
}

function* watchPostProfile() {
  while(true) {
    const {profile} = yield take(actions.POST_PROFILE);
    yield call(postProfile, profile);
  }
}

// Wait for successful response, then fire another request
// Cancel polling if user logs out
function* watchPollData() {

    while (CurrentUser.loggedIn()) {
        yield call(pollData);
    }
}

export default function* root() {
  yield [
    fork(watchGetOrgs),
    fork(watchPollData),
    fork(watchGetProfile),
    fork(watchPostProfile),
  ];
}
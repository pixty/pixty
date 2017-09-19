//import { normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import Cookies from 'universal-cookie';
import 'whatwg-fetch';

const PIXTY_API_ROOT = 'https://api.pixty.io/',
      SESSION_NAME = 'pixty_session';

function CurrentUser() {
  CurrentUser.cookies = new Cookies();

  this.getToken = () => {
    return CurrentUser.cookies.get(SESSION_NAME);
  };
  this.logOut = () => {
    return CurrentUser.cookies.remove(SESSION_NAME);
  };
  this.signIn = (token) => {
    CurrentUser.cookies.set(SESSION_NAME, token, { maxAge: 60*60 });
  };
}

CurrentUser.loggedIn = () => {
  return CurrentUser.cookies.get(SESSION_NAME) !== undefined;
};

CurrentUser.setCamera = (id) => {
  CurrentUser.selectedCamera = id;
};

CurrentUser.getCamera = () => {
  return CurrentUser.selectedCamera;
};

export { CurrentUser };



/*

 !!!  API Calls with normalizer and schemas
 !!!  Removed in this version

 import * as schema from '../api/schema';

function apiCall(endpoint, schema, method = 'get', data = null) {

  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
  const body = data ? JSON.stringify(data) : null;

  return fetch(fullUrl, {
      method: method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    })
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {

      if (!response.ok) {
        return Promise.reject(json);
      }

      const camelizedJson = camelizeKeys(Date.now() % 2 ? fakeJson : fakeJson2);

      return Object.assign({},
        normalize(camelizedJson, schema)
      );
    })
    .then(
      response => ({ response }),
      error => {
        alert(error);
        return error;
      }
    );

    export const postProfile = profile => apiCall(`profiles/${profile.id}`, schema.scene, 'put', profile);
}

*/

function pixtyApiCall(endpoint, method = 'GET', data = null) {

  const fullUrl = (endpoint.indexOf(PIXTY_API_ROOT) === -1) ? PIXTY_API_ROOT + endpoint : endpoint;
  const body = data ? JSON.stringify(data) : null;

  return fetch(fullUrl, {
      method: method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    })
    .then(response => {

        if (method === 'DELETE' || method === 'PUT') {
          let json = { method: method };
          return Promise.resolve().then(() => ({json, response}));
        }
        return response.json().then(json => ({ json, response }));
      }
    ).then(({ json, response }) => {

      if (!response.ok) {
        return Promise.reject(json);
      }

      const camelizedJson = camelizeKeys(json);

      return Object.assign({},
        camelizedJson
      );
    })
    .then(
      response => ({ response }),
      error => Promise.reject(error)
    );
}


export const postSession = (login, password) => pixtyApiCall('sessions', 'POST', { login: login, password: password });
export const deleteSession = (id) => pixtyApiCall(`sessions/${id}`, 'DELETE', { sessId: id });

export const fetchScene = camId => pixtyApiCall(`cameras/${camId}/timeline`);
export const fetchTimeline = camId => pixtyApiCall(`cameras/${camId}/timeline`);
export const fetchOrgs = id => pixtyApiCall(`orgs`);
export const fetchProfile = id => pixtyApiCall(`profiles/${id}`);

export const postProfile = profile => pixtyApiCall(`profiles/${profile.id}`, 'PUT', profile);


import { normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import * as schema from '../api/schema';
import { fakeJson } from './fake';
import { fakeJson2 } from './fake2';
import Cookies from 'universal-cookie';
import 'whatwg-fetch';

const API_ROOT = 'https://api.pixty.io/', //'http://localhost:8080/',
      PIXTY_API_ROOT = 'https://api.pixty.io/',
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

function pad(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

function apiCall(endpoint, schema, method = 'get', data = null) {

  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
  //const fullUrl = "http://localhost:8080/cameras/fp-123/scenes"
  const body = data ? JSON.stringify(data) : null;

  return fetch(fullUrl, {
      method: method,
      credentials: 'include',
      headers: {
      //  'Accept': 'application/json',
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

      //console.log("response.ok=", response, "json=", json)
      let number = (Date.now() % 300) + 1;
      fakeJson.snapshot.url = `http://pixty.io/assets/snapshots/rest${pad(number, 4)}.png`;
      //console.log(fakeJson.snapshot.url)

      const camelizedJson = camelizeKeys(Date.now() % 2 ? fakeJson : fakeJson2);

      //console.log('normalize!', normalize(camelizedJson, schema))

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
}

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
        if (method === 'DELETE') {
          let json = { status: 'delete' };
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

//export const fetchScene = camId => apiCall(`cameras/${camId}/timeline`, schema.scene)
export const fetchScene = camId => pixtyApiCall(`cameras/${camId}/timeline`);

export const fetchTimeline = camId => pixtyApiCall(`cameras/${camId}/timeline`);
export const fetchOrgs = id => pixtyApiCall(`orgs`);
export const fetchProfile = id => pixtyApiCall(`profiles/${id}`);

export const postProfile = profile => apiCall(`profiles/${profile.id}`, schema.scene, 'put', profile);


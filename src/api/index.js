import { normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import * as schema from '../api/schema'
import { fakeJson } from './fake'
import Cookies from 'universal-cookie'
import 'whatwg-fetch'

const API_ROOT = 'https://api.pixty.io/', //'http://localhost:8080/',
      PIXTY_API_ROOT = 'https://api.pixty.io/'

function CurrentUser() {
  CurrentUser.cookies = new Cookies();

  this.getToken = () => {
    return CurrentUser.cookies.get('_Pixty_Session')
  }
  this.logOut = () => {
    return CurrentUser.cookies.remove('_Pixty_Session')
  }
  this.signIn = (token) => {
    CurrentUser.cookies.set('_Pixty_Session', token, { maxAge: 60*60 })
  }
}


CurrentUser.loggedIn = () => {
  return CurrentUser.cookies.get('_Pixty_Session') !== undefined;
}

export { CurrentUser }

function pad(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

function apiCall(endpoint, schema, method = 'get', data = null) {

  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint
  //const fullUrl = "http://localhost:8080/cameras/fp-123/scenes"
  const body = data ? JSON.stringify(data) : null

  return fetch(fullUrl, {
      method: method,
      //headers: {
      //  'Accept': 'application/json',
      //  'Content-Type': 'application/json',
      //},
      body: body,
    })
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {

      if (!response.ok) {
        return Promise.reject(json)
      }

      //console.log("response.ok=", response, "json=", json)
      let number = (Date.now() % 300) + 1
      fakeJson.snapshot.url = `http://pixty.io/assets/snapshots/rest${pad(number, 4)}.png`
      //console.log(fakeJson.snapshot.url)

      const camelizedJson = camelizeKeys(fakeJson)

      //debugger;
      const realCamelizedJson = camelizeKeys(json)

      //console.log('normalize!', normalize(camelizedJson, schema))

      camelizedJson.real = realCamelizedJson

      return Object.assign({},
        normalize(camelizedJson, schema)
      )
    })
    .then(
      response => ({ response }),
      error => ({error: error.message || 'Something bad happened'})
    )
}

function pixtyApiCall(endpoint, method = 'GET', data = null) {

  const fullUrl = (endpoint.indexOf(PIXTY_API_ROOT) === -1) ? PIXTY_API_ROOT + endpoint : endpoint
  const body = data ? JSON.stringify(data) : null

  return fetch(fullUrl, {
      method: method,
      //mode: 'no-cors',
      headers: {
        //'Accept': 'application/json',
        //'Content-Type': 'application/json',
      },
      //body: body,
    })
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {

      if (!response.ok) {
        return Promise.reject(json)
      }

      const camelizedJson = camelizeKeys(json)

      return Object.assign({},
        camelizedJson
      )
    })
    .then(
      response => ({ response }),
      error => ({error: error.message || 'Something bad happened'})
    )
}

//export const fetchUser = login => callApi(`cameras/${login}/scenes`, schema.user)
export const fetchScene = camId => apiCall(`cameras/${camId}/timeline`, schema.scene)

export const fetchTimeline = camId => pixtyApiCall(`cameras/${camId}/timeline`)
export const fetchCameras = id => pixtyApiCall(`cameras`)
export const fetchProfile = id => pixtyApiCall(`profiles/${id}`)

export const postProfile = profile => apiCall(`profiles/${profile.id}/persons`, schema.scene, 'post', profile)


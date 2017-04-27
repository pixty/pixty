import { normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import * as schema from '../api/schema'
import { fakeJson } from './fake'
const API_ROOT = 'http://lvh.me:8080/'

function callApi(endpoint, schema) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint
  console.log("callApi")
  return fetch(fullUrl, {mode: 'no-cors'})
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }

      const camelizedJson = camelizeKeys(json)
      return Object.assign({},
        normalize(camelizedJson, schema)
      )
    })
    .then(
      response => ({ response }),
      error => ({error: error.message || 'Something bad happened'})
    )
}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

function fakeCallApi(endpoint, schema) {
  const fullUrl = "http://lvh.me:8080/cameras/fp-123/scenes"

  console.log('fakeCallApi')
  
  return fetch(fullUrl)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      
      if (!response.ok) {
        return Promise.reject(json)
      }

      console.log("response.ok=", response, "json=", json)
      //let number = (Date.now() % 300) + 1          
      //fakeJson.snapshot.url = `http://pixty.io/assets/snapshots/rest${pad(number, 4)}.png`
      //console.log(fakeJson.snapshot.url)
      
      //const camelizedJson = camelizeKeys(fakeJson)
      const camelizedJson = camelizeKeys(json[0])

      console.log('normalize!', normalize(camelizedJson, schema))      

      return Object.assign({},
        normalize(camelizedJson, schema)//,{ nextPageUrl }
      )
    })
    .then(
      response => ({ response }),
      error => ({error: error.message || 'Something bad happened'})
    )
}



export const fetchUser = login => callApi(`cameras/${login}/scenes`, schema.user)
export const fetchScene = login => fakeCallApi(`cameras/${login}/scenes`, schema.scene)


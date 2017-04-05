import { normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import * as schema from '../api/schema'
const API_ROOT = 'https://api.github.com/'

function callApi(endpoint, schema) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint
  console.log("callApi")
  return fetch(fullUrl)
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

let fakeJson = {
  "camId": "cm-1234",
  "timestamp": "2017-03-25T12:00:00,999Z",
  "snapshot": {
        "id": "tmp-pic-1234", 
        "timestamp": "2017-03-25T12:00:00,999Z",
        "url": "http://pixty.io/assets/scene4.png",
        "size": {
            "w": 1280,
            "h": 720
        }
    },
  "persons": [
    {
        "id": "123-333-222",
        "camId": "cam-1234",
        "capturedAt": "2017-03-25T12:00:00,999Z",
        "lostAt": "2017-03-25T12:00:00,999Z",
        "snapshotRect": {
            "l": 120,
            "t": 340,
            "r": 256,
            "b": 578
        },
        "profile": {
            "id": "pn-1334", 
            "occuracy": 9900,
            "orgId": "org-1234",
            "attributes": {
                "name": "Vaselisa",
                "lastName": "Wahl",
                "foot-size": "7"
            } 
        },
        "matches": [
          {            
            "id": "pn-1234", 
            "occuracy": 9500,
            "orgId": "org-1234",
            "attributes": {
                "name": "Vaselisa",
                "lastName": "Wahl",
                "foot-size": "7"
            }
          },          
          {
              "id": "pn-1235",
              "occuracy": 9000,
              "orgId": "org-1234",
              "attributes": {
                  "name": "Vasya",
                  "lastName": "Petrov",
                  "foot-size": "7"
              } 
          }
        ], 
        "pictures": [ {
            "id": "pc-1234", 
            "timestamp": "2017-03-25T12:00:00,999Z",
            "url": "https://pixty.io/api/pictures/pc-1234/download/pc-1234.png",
            "size": {
                "w": 200,
                "h": 200
            }, 
            "rect": {
                "l": 10,
                "t": 20,
                "r": 183,
                "b": 192
            }
        }, 
        {
            "id": "pc-1235", 
            "timestamp": "2017-03-25T12:00:00,999Z",
            "url": "https://pixty.io/api/pictures/pc-1235/download/pc-1235.png",
            "size": {
                "w": 456,
                "h": 456
            }, 
            "rect": {
                "l": 23,
                "t": 0,
                "r": 443,
                "b": 398
            }
        }
        ]
    }]
}

function fakeCallApi(endpoint, schema) {
  const fullUrl = "https://api.github.com/users/bedunkevich"

  console.log('fakeCallApi')
  
  return fetch(fullUrl)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }

      let number = (Date.now() % 4) + 1    
      fakeJson.snapshot.url = `http://pixty.io/assets/scene${number}.png`

      const camelizedJson = camelizeKeys(fakeJson)

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



export const fetchUser = login => callApi(`users/${login}`, schema.user)
export const fetchScene = login => fakeCallApi(`scene/${login}`, schema.scene)


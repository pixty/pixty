export const fakeJson2 = {
  "camId": "cm-1234",
  "organizationName" : "Feel Good Inc.",
  "timestamp": "2017-03-25T12:00:00,999Z",
  "snapshot": {
        "id": "tmp-pic-1234",
        "timestamp": "2017-03-25T12:00:00,999Z",
        "url": "http://pixty.io/assets/snapshots/rest0350.png",
        "src": "",
        "size": {
            "w": 1280,
            "h": 720
        }
    },
  "persons": [
    {
        "id": "123-333-222",
        "camId": "cam-1234",
        "capturedAt": "2017-07-25T12:00:00,999Z",
        "lostAt": "2017-03-25T12:00:00,999Z",
        "snapshotRect": {
            "l": 180,
            "t": 120,
            "r": 400,
            "b": 150
        },
        "profile": {
            "id": "pn-1334",
            "occuracy": 9900,
            "orgId": "org-1234",
            "attributes": {
                "name": "Дядя Вася",
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
            "url": "https://api.pixty.io/images/cm-ptt1504241567000.png",
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
            "url": "https://api.pixty.io/images/cm-ptt1504241500502.png",
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
    }
    ]
}
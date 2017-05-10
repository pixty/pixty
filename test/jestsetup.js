import { shallow, render, mount } from 'enzyme'
global.shallow = shallow
global.render = render
global.mount = mount
console.error = message => {
   throw new Error(message)
}

/*

{
  "name": "pixty",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "humps": "^2.0.0",
    "normalizr": "^3.2.2",
    "react": "^15.5.4",
    "react-dom": "^15.5.4",
    "react-redux": "^5.0.3",
    "react-redux-loading-bar": "^2.8.0",
    "react-router-dom": "^4.0.0",
    "react-router-redux": "^5.0.0-alpha.4",
    "react-tooltip": "^3.2.10",
    "redux": "^3.6.0",
    "redux-saga": "^0.15.3",
    "redux-thunk": "^2.2.0"
  },
  "devDependencies": {
    "babel-jest": "^20.0.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "babel-preset-stage-2": "^6.24.1",
    "enzyme": "^2.8.2",
    "enzyme-to-json": "^1.5.1",
    "jest": "^20.0.0",
    "react-addons-test-utils": "^15.5.1",
    "react-scripts": "0.9.5",
    "react-test-renderer": "^15.5.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "eject": "react-scripts eject"
  },
  "jest": {
    "setupFiles": [
      "./test/jestsetup.js"
    ],
    "snapshotSerializers": [
      "<rootDir>/node_modules/enzyme-to-json/serializer"
    ],
    "moduleNameMapper": {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
      "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
    }
  }
}

*/
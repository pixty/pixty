import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import thunk from 'redux-thunk'
import * as api from './api'
import * as pixtySchema from './api/schema'
import reducers from './reducers'
import { loadingBarReducer, loadingBarMiddleware } from 'react-redux-loading-bar'
import createSagaMiddleware, { END } from 'redux-saga'
import rootSaga from './sagas'
import { loadUserPage, loadScene} from './actions'

//let reducers = {}

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)
const sagaMiddleware = createSagaMiddleware()

function selected(state = "", action) {

  switch (action.type) {

    case 'CLICK_PERSONS':
        state = action.payload.id === state ? "" : action.payload.id
        return state
    default:
      return state
  }
  
}

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(  
  combineReducers({
    entities: reducers,
    router: routerReducer,
    loadingBar: loadingBarReducer,
    selectedPerson: selected
  }),
  applyMiddleware(sagaMiddleware, loadingBarMiddleware(), thunk.withExtraArgument({ api, pixtySchema }), middleware)
)

if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

store.runSaga = sagaMiddleware.run
store.close = () => store.dispatch(END)

store.runSaga(rootSaga)

store.subscribe(() =>
  console.log(store.getState())
)


function loadAll() {
  return function (dispatch) {
    //dispatch(loadUserPage('fp-123'))
    dispatch(loadScene('fp-123'))
  }
}


store.dispatch(loadAll())


import { Component } from 'react'

class About extends Component {  
  render() {  
    return (
    <button onClick={ () => {
      store.dispatch(push('/'))
    } }>
      Hello!
    </button>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically */ }
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={App}/>
        <Route path="/about" component={About}/>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)


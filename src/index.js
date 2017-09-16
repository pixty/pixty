import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import thunk from 'redux-thunk';
import * as api from './api';
import * as pixtySchema from './api/schema';
import reducers from './reducers';
import { loadingBarReducer, loadingBarMiddleware } from 'react-redux-loading-bar';
import createSagaMiddleware, { END } from 'redux-saga';
import rootSaga from './sagas';
import { loadScene, getOrgs } from './actions';
import selectedPersonReducer from './reducers/selectedPerson';
import LoginPage from './components/LoginPage';
import { CurrentUser, postSession, deleteSession } from './api';
import Modals from './containers/Modals';

// const preloadedState = window.__PRELOADED_STATE__
const preloadedState = { entities: { orgs: { 0: { cameras: [{id: 0, label: 'loading...', orgId: 1, hasSecretKey: true}] }}}};
// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

let currentUser = new CurrentUser();

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
	combineReducers({
		entities: reducers,
		router: routerReducer,
		loadingBar: loadingBarReducer,
		selectedPerson: selectedPersonReducer
	}),
	preloadedState,
	applyMiddleware(sagaMiddleware, loadingBarMiddleware(), thunk.withExtraArgument({ api, pixtySchema }), middleware)
);

if (module.hot) {
	// Enable Webpack hot module replacement for reducers
	module.hot.accept('./reducers', () => {
		const nextRootReducer = require('./reducers').default;
		store.replaceReducer(nextRootReducer);
	});
}

store.runSaga = sagaMiddleware.run;
store.close = () => store.dispatch(END);

store.subscribe(() =>
	console.log('Store', store.getState())
);

setTimeout(() => store.dispatch(loadAll()), 0);

const Welcome = () => (<div>
	<Modals />
	<h2 style={{padding: '20px', color: 'white'}}>Analytics</h2>
	<Link style={{padding: '20px', color: 'white'}} to="/">Home</Link>
</div>
);

const NotFount = () => (<div>
	<h2 style={{padding: '20px', color: 'white'}}>Route not found</h2>
	<Link style={{padding: '20px', color: 'white'}} to="/">Home</Link>
</div>
);

const Logout = () => {
	const session_id = currentUser.getToken();

	deleteSession(session_id).then((resolve) => {
		currentUser.logOut();
		window.location.reload();
	}).catch((error) => {
		console.log(error);
		currentUser.logOut();
		window.location.reload();
	});

	return null;
};

class UserAuth extends React.Component {
	constructor (props) {
		super(props);
		this.state = {userToken: currentUser.getToken()};
	}

	componentDidMount () {
		if (!this.state.userToken) {
			store.dispatch(push('/login'));
		} else {
			store.runSaga(rootSaga);
		}
	}

	render () {
		const LoginPageWrapper = () => (
			<LoginPage store={store} />
		);

		return (
			<div>
				{this.state.userToken ? this.props.children : <Switch>
					<Route exact path="/login" component={LoginPageWrapper}/>
				</Switch>
				}
			</div>
		);
	}
}

ReactDOM.render(
	<Provider store={store}>
		{ /* ConnectedRouter will use the store from Provider automatically */ }
		<ConnectedRouter history={history}>
			<UserAuth>
				<Switch>
					<Route exact path="/" component={App}/>
					<Route path="/analytics" component={Welcome}/>
					<Route path="/cameras" component={App}/>
					<Route exact path="/logout" component={Logout}/>
					<Route component={NotFount}/>
				</Switch>
			</UserAuth>
		</ConnectedRouter>
	</Provider>,
	document.getElementById('root')
);

function loadAll () {
	return function (dispatch) {
		dispatch(getOrgs());
		// dispatch(loadScene('fp-123'))
	};
}

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
import { getOrgs } from './actions';
import selectedPersonReducer from './reducers/selectedPerson';
import LoginPage from './components/LoginPage';
import ForgotPassword from './components/ForgotPassword';
import SignUpPage from './components/SignUpPage';
import { CurrentUser, deleteSession } from './api';
import { TermsOfService, PrivacyTerms } from './legal';

// const preloadedState = window.__PRELOADED_STATE__
const preloadedState = { entities: { settings: { showPreview: true, zoomLevel: 1 }, orgs: { 0: { cameras: [{id: 0, label: 'loading...', orgId: 1, hasSecretKey: true}] }}}};
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

/*
store.subscribe(() =>
	console.log('Store', store.getState())
);
*/

setTimeout(() => store.dispatch(loadAll()), 0);

const NotFount = () => (<div>
	<h2 style={{padding: '20px', color: 'white'}}>Route not found</h2>
	<Link style={{padding: '20px', color: 'white'}} to="/">Home</Link>
</div>
);

const Terms = () => (
	<div style={{display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
	<div style={{padding: '20px', color: 'white'}}>
		<h2>Terms of Service</h2>
		<div style={{whiteSpace: 'pre-line', fontWeight: 'light', maxWidth: '800px', fontSize: 'small',
		boxShadow: '5px 5px 10px rgba(0,0,0,0.2)',
		padding: '10px 20px', background: 'white', color: 'black'}}>
			{TermsOfService.data}
		</div>
		<div style={{marginTop: '20px'}}>
			<Link style={{color: 'white'}} to="/">Home</Link>
		</div>
	</div>
</div>
);

const Privacy = () => (
	<div style={{display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
		<div style={{padding: '20px', color: 'white'}}>
		<h2>Privacy</h2>
		<div style={{whiteSpace: 'pre-line', fontWeight: 'light', maxWidth: '800px', fontSize: 'small',
		boxShadow: '5px 5px 10px rgba(0,0,0,0.2)',
		padding: '10px 20px', background: 'white', color: 'black'}}>
			{PrivacyTerms.data}
		</div>
		<div style={{marginTop: '20px'}}>
			<Link style={{color: 'white'}} to="/">Home</Link>
		</div>
	</div>
</div>
);

class Root extends React.Component {
	componentDidMount() {
		store.dispatch(push('/'));
	}
	render = () => (null);
}

class PushLogin extends React.Component {
	componentDidMount() {
		store.dispatch(push('/login'));
	}
	render = () => (null);
}

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

	componentWillReceiveProps(nextProps) {

		if (currentUser.getToken()) {
			store.runSaga(rootSaga);
			store.dispatch(getOrgs());
		}

		this.setState({userToken: currentUser.getToken()});
	}

	componentDidMount () {
		if (this.state.userToken) {
			store.runSaga(rootSaga);
		}
	}

	render () {
		const LoginPageWrapper = () => (
			<LoginPage store={store} />
		);

		const ForgotPageWrapper = () => (
			<ForgotPassword store={store} />
		);

		const SignUpPageWrapper = () => (
			<SignUpPage store={store} />
		);


		return (
			<div>
				{this.state.userToken ? this.props.children : <Switch>
					<Route exact path="/login" component={LoginPageWrapper}/>
					<Route exact path="/signup" component={SignUpPageWrapper}/>
					<Route exact path="/forgot" component={ForgotPageWrapper}/>
					<Route exact path="/terms" component={Terms}/>
					<Route exact path="/privacy" component={Privacy}/>
					<Route exact path="/logout" component={Root}/>
					<Route component={PushLogin}/>
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
			<UserAuth history={history}>
				<Switch>
					<Route exact path="/" component={App}/>
					<Route exact path="/logout" component={Logout}/>
					<Route exact path="/login" component={Root}/>
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
	};
}

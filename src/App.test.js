import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
import App from './App';

const middlewares = [];
const mockStore = configureStore(middlewares);

it('App renders without crashing', () => {

  const initialState = {
    entities: {
      scene: {},
      modals: {},
      orgs: { 0: { cameras: [{id: 0, label: 'loading...', orgId: 1, hasSecretKey: true}] }},
      settings: { showPreview: true, zoomLevel: 1 }
    },
    router: {},
    loadingBar: 0,
    selectedPerson: {}
  };

  const store = mockStore(initialState);
  const dispatchSpy = sinon.spy();
  store.dispatch = dispatchSpy;

  const app = render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );
  expect(app).toMatchSnapshot();
});

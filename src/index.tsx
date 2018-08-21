import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import App from './app';
import { ITokens, listenForCallback } from './callback';
import './index.css';
import { loadDevices, loadUser, provideApi, setAuthInfo } from './state/actions';
import { createSpotifyStore } from './state/state';
import { initializeTeams, notifyAuthenticationSuccess, setOnAuthTokenCallback } from './teams/teams';

// import registerServiceWorker from './registerServiceWorker';
// initialize Microsoft Teams SDK
initializeTeams();

const store = createSpotifyStore();
ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root') as HTMLElement
);
// registerServiceWorker();
const updateToken = (token: ITokens) => {
  provideApi(token.token, token.refreshToken);
  store.dispatch(setAuthInfo(token.token, token.refreshToken));
  store.dispatch(loadUser() as any);
  store.dispatch(loadDevices() as any);
}
setOnAuthTokenCallback(updateToken)
listenForCallback().then((token) => {
  updateToken(token);
  notifyAuthenticationSuccess(token);
});
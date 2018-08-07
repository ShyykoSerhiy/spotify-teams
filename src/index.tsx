import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import { listenForCallback } from './callback';
import './index.css';
import { initializeTeams, notifyAuthenticationSuccess } from './teams/teams';

// import registerServiceWorker from './registerServiceWorker';
// initialize Microsoft Teams SDK
initializeTeams();

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root') as HTMLElement
);
// registerServiceWorker();

listenForCallback().then((token) => {
  notifyAuthenticationSuccess(token);  
});
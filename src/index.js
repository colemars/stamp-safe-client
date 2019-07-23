import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux';
import configureStore, { history } from "./store/configureStore"
import configureAmplify from "./amplify"

const store = configureStore();

configureAmplify();

// async function test2() {

//   Amplify.configure({
//     Auth: {
//       mandatorySignIn: false,
//       region: config.cognito.REGION,
//       identityPoolId: config.cognito.IDENTITY_POOL_ID,
//     },
//     Storage: {
//       region: config.s3.REGION,
//       bucket: config.s3.BUCKET,
//       identityPoolId: config.cognito.IDENTITY_POOL_ID
//     },
//     API: {
//       endpoints: [
//         {
//           name: "stage",
//           endpoint: config.apiGateway.URL,
//           region: config.apiGateway.REGION
//         },
//       ]
//     }
//   });

//   const anonymousUser = await Auth.currentCredentials();

//   console.log(anonymousUser)
// }

// test2();

ReactDOM.render(
  <Provider store = {store}>
    <ConnectedRouter history={history}>
        <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();

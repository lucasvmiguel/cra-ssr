import * as React from "react";

import { ConnectedRouter } from "connected-react-router";
import { hydrate, render } from "react-dom";
import { Frontload } from "react-frontload";
import * as Loadable from "react-loadable";
import { Provider } from "react-redux";
import createStore from "./store";

import App from "./app/app";

// Create a store and get back itself and its history object
const { store, history } = createStore();

// Running locally, we should run on a <ConnectedRouter /> rather than on a <StaticRouter /> like on the server
// Let's also let React Frontload explicitly know we're not rendering on the server here
const Application = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Frontload noServerRender={true}>
        <App />
      </Frontload>
    </ConnectedRouter>
  </Provider>
);

const root = document.querySelector("#root");

if (root && root.hasChildNodes() === true) {
  // If it's an SSR, we use hydrate to get fast page loads by just
  // attaching event listeners after the initial render
  Loadable.preloadReady().then(() => {
    hydrate(Application, root);
  });
} else {
  // If we're not running on the server, just render like normal
  render(Application, root);
}

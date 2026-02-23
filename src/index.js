import React from "react";
import { createRoot } from "react-dom/client";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { HashRouter as Router } from "react-router-dom";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import "semantic-ui-css/semantic.min.css";

import App from "./components/App";
import reducers from "./reducers";

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);

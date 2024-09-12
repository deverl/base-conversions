import React from "react";
import { createRoot } from "react-dom/client";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { HashRouter as Router } from "react-router-dom";
import { thunk } from "redux-thunk";
import "semantic-ui-css/semantic.min.css";

import App from "./components/App";
import reducers from "./reducers";

const store = createStore(reducers, applyMiddleware(thunk));

// const store = createStore(reducers);

const rootContainer = document.getElementById("root");
const root = createRoot(rootContainer);

root.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);

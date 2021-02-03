import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { HashRouter as Router } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import "semantic-ui-css/semantic.min.css";

import App from "./components/App";
import reducers from "./reducers";
import history from "./history";

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

// const store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

import App from "./components/App";
import history from "./history";
ReactDOM.render(
    <Router history={history}>
        <App />
    </Router>,
    document.getElementById("root")
);

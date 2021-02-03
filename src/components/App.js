import React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import TopNavBar from "./TopNavBar";
import FromDecimal from "./FromDecimal";
import ToDecimal from "./ToDecimal";

class App extends React.Component {
    state = { initialPath: "/" };

    render() {
        const pathname = window.location.hash.substr(2);
        console.log("App.render. pathname = " + pathname);
        return (
            <div className="ui container app-container">
                <TopNavBar key={pathname} initialPath={pathname} />
                <Switch>
                    <Route path="/" exact>
                        <FromDecimal />
                    </Route>
                    <Route path="/from-decimal">
                        <FromDecimal />
                    </Route>
                    <Route path="/to-decimal">
                        <ToDecimal />
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default App;

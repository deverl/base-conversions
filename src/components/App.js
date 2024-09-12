import React from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import TopNavBar from "./TopNavBar";
import FromDecimal from "./FromDecimal";
import ToDecimal from "./ToDecimal";

class App extends React.Component {
    state = { initialPath: "/" };

    getInitialPath = () => {
        let path = "/";
        if (window.location.hash.length > 2) {
            path = window.location.hash.substr(2);
        }
        return path;
    };

    render() {
        const path = this.getInitialPath();
        return (
            <div className="ui container app-container">
                <TopNavBar key={path} initialPath={path} />
                <Routes>
                    <Route path="/" exact element={<FromDecimal />} />
                    <Route path="/from-decimal" element={<FromDecimal />} />
                    <Route path="/to-decimal" element={<ToDecimal />} />
                </Routes>
            </div>
        );
    }
}

export default App;

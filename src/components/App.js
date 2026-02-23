import React from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import { version } from "../version";
import TopNavBar from "./TopNavBar";
import FromDecimal from "./FromDecimal";
import ToDecimal from "./ToDecimal";

class App extends React.Component {
    render() {
        return (
            <div className="ui container app-container">
                <TopNavBar />
                <Routes>
                    <Route path="/" element={<FromDecimal />} />
                    <Route path="/from-decimal" element={<FromDecimal />} />
                    <Route path="/to-decimal" element={<ToDecimal />} />
                </Routes>
                <div className="app-version">v{version}</div>
            </div>
        );
    }
}

export default App;

import React, { useState } from "react";
import { Menu } from "semantic-ui-react";

import "./TopNavBar.css";
import history from "../history";

class TopNavBar extends React.Component {
    state = { activeItem: "from-decimal" };

    onClick = (e, { name }) => {
        console.log("TopNavBar: name = " + name);
        this.setState({ activeItem: name });
        history.push(`/${name}`);
    };

    render() {
        const { activeItem } = this.state;

        return (
            <Menu pointing secondary className=".top-nav-bar">
                <Menu.Item
                    name="from-decimal"
                    active={activeItem === "from-decimal"}
                    onClick={this.onClick}
                ></Menu.Item>
                <Menu.Item
                    name="to-decimal"
                    active={activeItem === "to-decimal"}
                    onClick={this.onClick}
                ></Menu.Item>
            </Menu>
        );
    }
}

export default TopNavBar;

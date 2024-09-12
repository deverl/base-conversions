import React from "react";
import { Menu } from "semantic-ui-react";

import "./TopNavBar.css";

class TopNavBar extends React.Component {
    state = { activeItem: this.props.initialPath };

    onClick = (e, { name }) => {
        this.setState({ activeItem: name });
    };

    render() {
        const { activeItem } = this.state;

        return (
            <Menu pointing secondary className=".top-nav-bar">
                <Menu.Item
                    name="from-decimal"
                    active={activeItem === "from-decimal" || activeItem === "/"}
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

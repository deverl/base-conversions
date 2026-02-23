import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu } from "semantic-ui-react";

import "./TopNavBar.css";

export default function TopNavBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const pathname = location.pathname || "/";
    const activeItem = pathname === "/" ? "from-decimal" : pathname.replace(/^\//, "");

    const onClick = (e, { name }) => {
        navigate(`/${name}`);
    };

    return (
        <Menu pointing secondary className="top-nav-bar">
            <Menu.Item
                name="from-decimal"
                active={activeItem === "from-decimal"}
                onClick={onClick}
            />
            <Menu.Item
                name="to-decimal"
                active={activeItem === "to-decimal"}
                onClick={onClick}
            />
        </Menu>
    );
}

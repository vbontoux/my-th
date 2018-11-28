import React from "react";
import {NavItem, NavLink, Popover, PopoverBody, PopoverHeader} from "reactstrap";
import LoginForm from "./loginForm";
import {urls} from "../config";
import {Link} from "react-router-dom";

export default function (props) {
    let url = urls.loginUrl;
    if (props.next) {
        url += props.next;
    }
    return (
        <NavItem>
            <Link to={url}>Login</Link>
        </NavItem>
    );
}


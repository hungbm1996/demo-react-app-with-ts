import classNames from "classnames";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { selectors } from "../states/redux";
import { CREATE_QUESTION_URL, HOME_URL, LEADER_BOARED_URL, LOGIN_URL } from "../utils/constants";

export const TabControl = React.memo(() => {
    const { pathname } = useLocation();
    const loginUser = useSelector(selectors.getLoginUserSelector);

    return (
        <>
            <div className="tabs_wrap">
                <ul>
                    <li data-tabs="male"
                        className={ classNames({ "active": pathname === HOME_URL }) } >
                        <Link to={ HOME_URL }>Home</Link></li>
                    <li data-tabs="female"
                        className={ classNames({ "active": pathname === CREATE_QUESTION_URL }) } >
                        <Link to={ CREATE_QUESTION_URL }>New Questions</Link></li>
                    <li data-tabs="both"
                        className={ classNames({ "active": pathname === LEADER_BOARED_URL }) } >
                        <Link to={ LEADER_BOARED_URL }>Leader board</Link>
                    </li>
                </ul>
                { loginUser && <div className="user">
                    <div className="user-data">
                        <p className="name">Hello, { loginUser.name }</p>
                    </div>
                    <button type="button" className="user-image">
                        <Link to={ LOGIN_URL }><img src={ loginUser.avatarURL } alt="" /></Link>
                    </button>
                </div> }
            </div>
        </>);
});

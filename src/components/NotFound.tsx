import React from "react";
import { Link } from "react-router-dom";
import { HOME_URL } from "../utils/constants";

export const NotFound = React.memo(() => {
    return (
        <>
            <div className="tabs_wrap">
                <ul>
                    <li data-tabs="male">
                        <Link to={ HOME_URL }>Home</Link></li>
                </ul>
            </div>
            <div style={ { textAlign: 'center' } } className="home">
                Page not found
            </div>
        </>);
});
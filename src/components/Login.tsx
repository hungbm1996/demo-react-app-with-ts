import { map } from "lodash";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginInformation, UserInfo } from "../@types/types";
import { useHandleOperation } from "../hooks/useHandleOperation";
import { actions } from "../states/redux";
import { HOME_URL } from "../utils/constants";
import { convertObjectToUserList } from "../utils/utils";

type SelectLoginUserType = {
    userList: UserInfo[];
    value?: string;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

const SelectLoginUser = React.memo((props: SelectLoginUserType) => {
    const { userList, value, onChange } = props;
    return (
        <>
            <label>Select user to login</label>
            <select name="user-list" value={ value || "default" } onChange={ onChange }>
                <option disabled value={ "default" }>Select user</option>
                { map(userList, (user) => {
                    const { id, name } = user;
                    return <option key={ id } value={ id }>{ name }</option>;
                }) }
            </select>
        </>
    );
});

export const Login = React.memo(() => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ selectUser, setSelectUser ] = useState<LoginInformation>();

    const { users, loginUser, destinationUrl } = useHandleOperation();

    useEffect(() => {
        if (loginUser) {
            setSelectUser(loginUser);
        }
    }, [ loginUser ]);

    const handleChangeUser = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        const { value: id } = event.target;
        const userInfo = {
            id: users[ id ].id,
            name: users[ id ].name,
            avatarURL: users[ id ].avatarURL
        };
        setSelectUser(userInfo);
    }, [ users ]);

    const handleLogin = useCallback(() => {
        dispatch(actions.submitLogin(selectUser as LoginInformation));
        navigate(destinationUrl || HOME_URL, { replace: true });
    }, [ destinationUrl, dispatch, navigate, selectUser ]);

    const handleLogout = useCallback(() => {
        setSelectUser(undefined);
        dispatch(actions.submitLogout());
    }, [ dispatch ]);

    return <div className="container">
        <div className="row">
            <div className="col-50">
                <h3 style={ { 'borderBottom': '1px solid #ccc' } }>
                    Welcome to the Would You Rather App !
                </h3>
                <label style={ {
                    textAlign: 'center',
                    paddingTop: '10px'
                } }>Please sign in to continue</label>
                <SelectLoginUser
                    userList={ convertObjectToUserList(users) }
                    value={ selectUser?.id }
                    onChange={ handleChangeUser } />
            </div>
            <div className="col-50">
                <h3>User information</h3>
                { selectUser && <label>Name: { selectUser.name }</label> }
            </div>
        </div>
        { !loginUser && <button type="button" disabled={ !selectUser }
            className="btn" onClick={ handleLogin }>
            Login as user</button> }
        { loginUser && <button type="button" className="btn" onClick={ handleLogout }>
            Logout</button> }
    </div >;
});

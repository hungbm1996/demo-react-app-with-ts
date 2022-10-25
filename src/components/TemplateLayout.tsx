import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import '../App.css';
import { useHandleOperation } from '../hooks/useHandleOperation';
import { actions } from '../states/redux';
import { ANSWERED_RESULT_URL, CREATE_QUESTION_URL, DETAIL_QUESTION_URL, HOME_URL, LEADER_BOARED_URL, LOGIN_URL, NOT_FOUND_URL } from '../utils/constants';
import { CreateQuestion } from './CreateQuestion';
import { Header } from './Header';
import { Home } from './Home';
import { LeaderBoard } from './LeaderBoard';
import { Login } from './Login';
import { NotFound } from './NotFound';
import { QuestionAnswerResult } from './QuestionAnswerResult';
import { QuestionDetail } from './QuestionDetail';
import { TabControl } from './TabControl';

interface RequireAuthProps {
  children: React.ReactNode;
}

const { fetchQuestions, fetchUsers, setDestinationUrl } = actions;

export const RequireAuth = React.memo((props: RequireAuthProps) => {
  const { children } = props;
  const { isAuthed } = useHandleOperation();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthed) {
      dispatch(setDestinationUrl(location.pathname));
    }
  }, [dispatch, isAuthed, location.pathname, navigate]);

  if (isAuthed) {
    return (
      <>
        <TabControl />
        {children}
      </>);
  }

  return <Navigate to={LOGIN_URL} replace={true} />;
});

export const TemplateRoutes = React.memo(() => {
  return <Routes>
    <Route path="/" element={<Login />} />
    {/* <Route path="*" element={ <Login /> } /> */}
    <Route path={LOGIN_URL} element={<Login />} />
    <Route path={NOT_FOUND_URL} element={<NotFound />} />
    <Route path={HOME_URL} element={
      <RequireAuth>
        <Home />
      </RequireAuth>
    } />
    <Route path={CREATE_QUESTION_URL} element={
      <RequireAuth>
        <CreateQuestion />
      </RequireAuth>
    } />
    <Route path={LEADER_BOARED_URL} element={
      <RequireAuth>
        <LeaderBoard />
      </RequireAuth>
    } />
    <Route path={DETAIL_QUESTION_URL} element={
      <RequireAuth>
        <QuestionDetail />
      </RequireAuth>
    } />
    <Route path={ANSWERED_RESULT_URL} element={
      <RequireAuth>
        <QuestionAnswerResult />
      </RequireAuth>
    } />
  </Routes >;
});

export const TemplateLayout = React.memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginUser } = useHandleOperation();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  useEffect(() => {
    if (isEmpty(loginUser)) {
      navigate(LOGIN_URL, { replace: true });
    }
  }, [loginUser, navigate]);

  return <div className="wrapper">
    <Header />
    <div className="container">
      <TemplateRoutes />
    </div>
  </div>;
});

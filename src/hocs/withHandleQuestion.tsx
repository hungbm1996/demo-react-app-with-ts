import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { selectors } from '../states/redux';
import { NOT_FOUND_URL } from '../utils/constants';

export interface HandleQuestion {
  questionId: string;
}

const { checkExistsQuestionSelector } = selectors;

export const withHandleQuestion =
  (Component: React.ComponentType<HandleQuestion>) => () => {
    const { questionId = '' } = useParams<{ questionId: string; }>();
    const isExists = useSelector(checkExistsQuestionSelector(questionId));

    if (isExists) {
      return <Component questionId={questionId} />;
    }

    return <Navigate to={NOT_FOUND_URL} replace />;
  };

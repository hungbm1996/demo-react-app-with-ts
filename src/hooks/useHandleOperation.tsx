import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoginInformation, QuestionsSchema, UsersSchema } from '../@types/types';
import { actions, selectors } from '../states/redux';

const {
  createQuestion,
  clearCreateQuestion,
  setQuestionDetail
} = actions;

const {
  getCreateQuestionSelector,
  getLoginUserSelector,
  getAuthedSelector,
  getQuestionsSelector,
  getUsersSelector,
  getDestinationUrlSelector
} = selectors;

interface UseHandleOperationType {
  users: UsersSchema;
  questions: QuestionsSchema;
  isAuthed: boolean;
  loginUser: LoginInformation;
  questionInfo: any;
  destinationUrl: string;
  onCreateQuestion: any;
  onClearCreateQuestion: any;
  onSetQuestionInfo: any;
}

export const useHandleOperation = (): UseHandleOperationType => {
  const dispatch = useDispatch();
  const users = useSelector(getUsersSelector);
  const loginUser = useSelector(getLoginUserSelector);
  const isAuthed = useSelector(getAuthedSelector);
  const questions = useSelector(getQuestionsSelector);
  const questionInfo = useSelector(getCreateQuestionSelector);
  const destinationUrl = useSelector(getDestinationUrlSelector);

  const onCreateQuestion = useCallback((optionOne: string, optionTwo: string) => {
    dispatch(createQuestion({
      author: loginUser?.id,
      optionOneText: optionOne,
      optionTwoText: optionTwo
    }));
  }, [dispatch, loginUser?.id]);

  const onClearCreateQuestion = useCallback(() => {
    dispatch(clearCreateQuestion());
  }, [dispatch]);

  const onSetQuestionInfo = useCallback((questionId: string, userId: string) => {
    dispatch(setQuestionDetail({ questionId, userId }));
    // localStorage.setItem('questionId', questionId);
    localStorage.setItem('userId', userId);
  }, [dispatch]);

  return {
    users,
    questions,
    isAuthed,
    loginUser,
    questionInfo,
    destinationUrl,
    onCreateQuestion,
    onClearCreateQuestion,
    onSetQuestionInfo
  };
};

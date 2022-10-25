import { get, map, reverse, sortBy } from "lodash";
import { createSelector } from "reselect";
import {
  LeaderBoard,
  LoginInformation,
  QuestionDetailInfo,
  QuestionsSchema,
  UserInfo,
} from "../../@types/types";
import {
  countScoreByAnsweredQuestion,
  countScoreByCreatedQuestion,
  getAnsweredQuestions,
  getQuestionsDisplay,
} from "../../utils/utils";
import { AppState } from "../roots";

const getUsers = (state: AppState) => state.users.data;
const getQuestions = (state: AppState) => state.questions.data;
const getLoginUser = (state: AppState) => state.login.data.user;
const getAuthedUser = (state: AppState) => state.login.data.isAuthed;
const getDestinationUrl = (state: AppState) =>
  state.login.other?.destinationUrl;
const getCreateQuestion = (state: AppState) => state.createQuestion.data;
const getSaveQuestionAnswer = (state: AppState) =>
  state.saveQuestionAnswer.data;

export const getUsersSelector = createSelector(getUsers, (users) => users);
export const getQuestionsSelector = createSelector(
  getQuestions,
  (question) => question
);
export const getCreateQuestionSelector = createSelector(
  getCreateQuestion,
  (createQuestion) => createQuestion
);
export const getSaveQuestionAnswerSelector = createSelector(
  getSaveQuestionAnswer,
  (saveQuestionAnswer) => saveQuestionAnswer
);

export const getLoginUserSelector = createSelector(
  getLoginUser,
  (user) => user as LoginInformation
);

export const getAuthedSelector = createSelector(
  getAuthedUser,
  (isAuthed) => isAuthed as boolean
);

export const getDestinationUrlSelector = createSelector(
  getDestinationUrl,
  (url) => url as string
);

export const getQuestionsDisplaySelector = createSelector(
  [getLoginUserSelector, getQuestionsSelector],
  (loginUser, questions) => {
    const id = loginUser ? loginUser.id : "";
    return getQuestionsDisplay(questions, id);
  }
);

export const getAnsweredQuestionsSelector = createSelector(
  getQuestionsSelector,
  (questions) => {
    return getAnsweredQuestions(questions);
  }
);

export const getQuestionDetailSelector = (questionId: string, userId: string) =>
  createSelector(
    [getQuestions, getUsers],
    (questions, users): QuestionDetailInfo => {
      const { id: qid, ...restQuestion } = get(questions, questionId);
      const { id: uid, ...restUser } = get(users, userId);
      return {
        qid,
        uid,
        ...restQuestion,
        ...restUser,
      };
    }
  );

export const checkExistsQuestionSelector = (questionId: string) =>
  createSelector(getQuestions, (questions: QuestionsSchema): boolean => {
    const questionInfo = get(questions, questionId);
    if (questionInfo) {
      return true;
    }
    return false;
  });

export const getLeaderBoardUsersSelector = createSelector(
  getUsersSelector,
  (users): LeaderBoard[] => {
    const usersArray = Object.values(users) as UserInfo[];
    const draftResult = map(usersArray, (user) => {
      const { answers, questions } = user;
      const scoredByAnswered = countScoreByAnsweredQuestion(answers);
      const scoredByCreated = countScoreByCreatedQuestion(questions);
      return {
        ...user,
        scoredByAnswered,
        scoredByCreated,
      };
    });
    return reverse(
      sortBy(
        draftResult,
        (result) => result.scoredByCreated + result.scoredByAnswered
      )
    );
  }
);

export const getNumberOfUser = createSelector(
  getUsersSelector,
  (users): number => {
    return Object.values(users).length;
  }
);

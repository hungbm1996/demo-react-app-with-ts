import { get } from "lodash";
import {
  LoginInformation,
  QuestionAnswer,
  QuestionInfo,
  QuestionsSchema,
  UsersSchema,
} from "../../@types/types";
import {
  CLEART_CREATE_QUESTION,
  CLEART_SAVE_QUESTION_ANSWER,
  CreateQuestionsActions,
  CreateQuestionState,
  CREATE_QUESTION,
  CREATE_QUESTION_FAIL,
  CREATE_QUESTION_SUCCESS,
  FetchQuestionsActions,
  FetchQuestionsState,
  FetchUsersActions,
  FetchUsersState,
  FETCH_QUESTIONS,
  FETCH_QUESTIONS_FAIL,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_USERS,
  FETCH_USERS_FAIL,
  FETCH_USERS_SUCCESS,
  INIT_CREATE_QUESTION_STATE,
  INIT_LOGIN_STATE,
  INIT_QUESTIONS_STATE,
  INIT_SAVE_QUESTION_ANSWER_STATE,
  INIT_USERS_STATE,
  LoginActions,
  LoginState,
  RE_UPDATE_QUESTIONS,
  RE_UPDATE_QUESTIONS_1,
  RE_UPDATE_USERS,
  RE_UPDATE_USERS_1,
  SaveQuestionAnswerActions,
  SaveQuestionAnswerState,
  SAVE_QUESTION_ANSWER,
  SAVE_QUESTION_ANSWER_FAIL,
  SAVE_QUESTION_ANSWER_SUCCESS,
  SetQuestionDetail,
  SET_DESTINATION_URL,
  SET_QUESTION_DETAIL,
  SUBMIT_LOGIN,
  SUBMIT_LOGOUT,
} from "./types";

export const login = (
  state = INIT_LOGIN_STATE,
  action: LoginActions
): LoginState => {
  const { type, payload } = action;

  switch (type) {
    case SUBMIT_LOGIN:
      return {
        ...state,
        data: {
          isAuthed: true,
          user: payload as LoginInformation,
        },
      };

    case SET_DESTINATION_URL:
      return {
        ...state,
        other: {
          destinationUrl: payload as string,
        },
      };

    case SUBMIT_LOGOUT:
      return INIT_LOGIN_STATE;

    default:
      return state;
  }
};

export const users = (
  state = INIT_USERS_STATE,
  action: FetchUsersActions
): FetchUsersState => {
  const { type, payload } = action;

  switch (type) {
    // case REHYDRATE:
    //   return { ...state };

    case FETCH_USERS:
      return {
        ...state,
        loading: true,
      };

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload as UsersSchema,
      };

    case RE_UPDATE_USERS:
      const { uid, qid } = payload as any;
      const oldState = { ...state.data } as any;

      return {
        ...state,
        loading: false,
        data: {
          ...oldState,
          [uid]: {
            ...oldState[uid],
            questions: oldState[uid].questions.concat([qid]),
          },
        },
      };

    case RE_UPDATE_USERS_1:
      const oldState1 = { ...state.data };
      const { authedUser, answer, qid: qid1 } = payload as any;

      return {
        ...state,
        loading: false,
        data: {
          ...oldState1,
          [authedUser]: {
            ...oldState1[authedUser],
            [qid1]: answer,
          },
        },
      };

    case FETCH_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload as Error,
      };

    default:
      return state;
  }
};

export const questions = (
  state = INIT_QUESTIONS_STATE,
  action: FetchQuestionsActions
): FetchQuestionsState => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_QUESTIONS:
      return {
        ...state,
        loading: true,
      };

    case FETCH_QUESTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload as QuestionsSchema,
      };

    case RE_UPDATE_QUESTIONS:
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          [(payload as any).id]: payload,
        },
      };

    case RE_UPDATE_QUESTIONS_1:
      const oldState = { ...state.data };
      const { authedUser, qid, answer } = payload as any;
      const questionById = oldState[qid];
      const questionByIdAndAnswer = get(questionById, answer) as any;

      return {
        ...state,
        loading: false,
        data: {
          ...oldState,
          [qid]: {
            ...questionById,
            [answer]: {
              ...questionByIdAndAnswer,
              votes: [...questionByIdAndAnswer.votes, authedUser],
            },
          },
        },
      };

    case FETCH_QUESTIONS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload as Error,
      };

    case SET_QUESTION_DETAIL:
      return {
        ...state,
        loading: false,
        other: {
          questionDetail: payload as SetQuestionDetail,
        },
      };

    default:
      return state;
  }
};

export const createQuestion = (
  state = INIT_CREATE_QUESTION_STATE,
  action: CreateQuestionsActions
): CreateQuestionState => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_QUESTION:
      return {
        ...state,
        loading: true,
      };

    case CREATE_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload as QuestionInfo,
      };

    case CREATE_QUESTION_FAIL:
      return {
        ...state,
        loading: false,
        error: payload as Error,
      };

    case CLEART_CREATE_QUESTION:
      return INIT_CREATE_QUESTION_STATE;

    default:
      return state;
  }
};

export const saveQuestionAnswer = (
  state = INIT_SAVE_QUESTION_ANSWER_STATE,
  action: SaveQuestionAnswerActions
): SaveQuestionAnswerState => {
  const { type, payload } = action;

  switch (type) {
    case SAVE_QUESTION_ANSWER:
      return {
        ...state,
        loading: true,
      };

    case SAVE_QUESTION_ANSWER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload as QuestionAnswer,
      };

    case SAVE_QUESTION_ANSWER_FAIL:
      return {
        ...state,
        loading: false,
        error: payload as Error,
      };

    case CLEART_SAVE_QUESTION_ANSWER:
      return INIT_SAVE_QUESTION_ANSWER_STATE;

    default:
      return state;
  }
};

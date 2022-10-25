import {
  FormatQuestionType,
  LoginInformation,
  QuestionAnswer,
  QuestionInfo,
  QuestionsSchema,
  UsersSchema,
} from "../../@types/types";

export const FETCH_USERS = "FETCH_USERS";
export const FETCH_USERS_FAIL = "FETCH_USERS_FAIL";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";

export const FETCH_QUESTIONS = "FETCH_QUESTIONS";
export const FETCH_QUESTIONS_FAIL = "FETCH_QUESTIONS_FAIL";
export const FETCH_QUESTIONS_SUCCESS = "FETCH_QUESTIONS_SUCCESS";
export const SET_QUESTION_DETAIL = "SET_QUESTION_DETAIL";

export const CREATE_QUESTION = "CREATE_QUESTION";
export const CREATE_QUESTION_FAIL = "CREATE_QUESTION_FAIL";
export const CREATE_QUESTION_SUCCESS = "CREATE_QUESTION_SUCCESS";
export const CLEART_CREATE_QUESTION = "CLEART_CREATE_QUESTION";
export const RE_UPDATE_QUESTIONS = "RE_UPDATE_QUESTIONS";
export const RE_UPDATE_USERS = "RE_UPDATE_USERS";

export const SUBMIT_LOGIN = "SUBMIT_LOGIN";
export const SUBMIT_LOGOUT = "SUBMIT_LOGOUT";
export const SET_DESTINATION_URL = "SET_DESTINATION_URL";

export const SAVE_QUESTION_ANSWER = "SAVE_QUESTION_ANSWER";
export const SAVE_QUESTION_ANSWER_FAIL = "SAVE_QUESTION_ANSWER_FAIL";
export const SAVE_QUESTION_ANSWER_SUCCESS = "SAVE_QUESTION_ANSWER_SUCCESS";
export const CLEART_SAVE_QUESTION_ANSWER = "CLEART_SAVE_QUESTION_ANSWER";
export const RE_UPDATE_QUESTIONS_1 = "RE_UPDATE_QUESTIONS_1";
export const RE_UPDATE_USERS_1 = "RE_UPDATE_USERS_1";

export const INIT_USERS_STATE: FetchUsersState = {
  loading: false,
  data: {},
};

export const INIT_QUESTIONS_STATE: FetchQuestionsState = {
  loading: false,
  data: {},
};

export const INIT_CREATE_QUESTION_STATE: CreateQuestionState = {
  loading: false,
  data: undefined,
};

export const INIT_SAVE_QUESTION_ANSWER_STATE: SaveQuestionAnswerState = {
  loading: false,
  data: undefined,
};

export const INIT_LOGIN_STATE: LoginState = {
  loading: false,
  data: {},
};

export type GenerationActions<T> = {
  type: string;
  payload?: T;
};

export type GenerationStates<T> = {
  loading?: boolean;
  data: T;
  error?: Error;
  other?: Record<string, unknown>;
};

export type SetQuestionDetail = {
  questionId: string;
  userId: string;
};

export type FetchUsersActions = GenerationActions<UsersSchema | Error>;
export type FetchUsersState = GenerationStates<UsersSchema>;

export type FetchQuestionsActions = GenerationActions<
  SetQuestionDetail | QuestionsSchema | Error
>;
export type FetchQuestionsState = GenerationStates<QuestionsSchema>;

export type CreateQuestionsActions = GenerationActions<
  FormatQuestionType | Error | QuestionInfo
>;
export type CreateQuestionState = GenerationStates<QuestionInfo | undefined>;

export type SaveQuestionAnswerActions = GenerationActions<
  QuestionAnswer | Error
>;
export type SaveQuestionAnswerState = GenerationStates<
  QuestionAnswer | undefined
>;

export type LoginActions = GenerationActions<string | LoginInformation>;
export type LoginState = GenerationStates<
  Record<string, LoginInformation | boolean>
>;

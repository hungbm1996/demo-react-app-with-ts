import {
  FormatQuestionType,
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
  CREATE_QUESTION,
  CREATE_QUESTION_FAIL,
  CREATE_QUESTION_SUCCESS,
  FetchQuestionsActions,
  FetchUsersActions,
  FETCH_QUESTIONS,
  FETCH_QUESTIONS_FAIL,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_USERS,
  FETCH_USERS_FAIL,
  FETCH_USERS_SUCCESS,
  LoginActions,
  RE_UPDATE_QUESTIONS,
  RE_UPDATE_QUESTIONS_1,
  RE_UPDATE_USERS,
  RE_UPDATE_USERS_1,
  SaveQuestionAnswerActions,
  SAVE_QUESTION_ANSWER,
  SAVE_QUESTION_ANSWER_FAIL,
  SAVE_QUESTION_ANSWER_SUCCESS,
  SetQuestionDetail,
  SET_DESTINATION_URL,
  SET_QUESTION_DETAIL,
  SUBMIT_LOGIN,
  SUBMIT_LOGOUT,
} from "./types";

export const fetchUsers = (): FetchUsersActions => ({
  type: FETCH_USERS,
});

export const fetchUsersFail = (error: Error): FetchUsersActions => ({
  type: FETCH_USERS_FAIL,
  payload: error,
});

export const fetchUsersSuccess = (result: UsersSchema): FetchUsersActions => ({
  type: FETCH_USERS_SUCCESS,
  payload: result,
});

export const fetchQuestions = (): FetchQuestionsActions => ({
  type: FETCH_QUESTIONS,
});

export const fetchQuestionsFail = (error: Error): FetchQuestionsActions => ({
  type: FETCH_QUESTIONS_FAIL,
  payload: error,
});

export const fetchQuestionsSuccess = (
  result: QuestionsSchema
): FetchQuestionsActions => ({
  type: FETCH_QUESTIONS_SUCCESS,
  payload: result,
});

export const createQuestion = (
  question: FormatQuestionType
): CreateQuestionsActions => ({
  type: CREATE_QUESTION,
  payload: question,
});

export const createQuestionFail = (error: Error): CreateQuestionsActions => ({
  type: CREATE_QUESTION_FAIL,
  payload: error,
});

export const createQuestionSuccess = (
  result: QuestionInfo
): CreateQuestionsActions => ({
  type: CREATE_QUESTION_SUCCESS,
  payload: result,
});

export const reupdateQuestions = (
  result: QuestionInfo
): CreateQuestionsActions => ({
  type: RE_UPDATE_QUESTIONS,
  payload: result,
});

export const reupdateUsers = (result: any): CreateQuestionsActions => ({
  type: RE_UPDATE_USERS,
  payload: result,
});

export const clearCreateQuestion = (): CreateQuestionsActions => ({
  type: CLEART_CREATE_QUESTION,
});

export const saveQuestionAnswer = (
  questionAnswer: QuestionAnswer
): SaveQuestionAnswerActions => ({
  type: SAVE_QUESTION_ANSWER,
  payload: questionAnswer,
});

export const saveQuestionAnswerFail = (
  error: Error
): SaveQuestionAnswerActions => ({
  type: SAVE_QUESTION_ANSWER_FAIL,
  payload: error,
});

export const saveQuestionAnswerSuccess = (
  result: QuestionAnswer
): SaveQuestionAnswerActions => ({
  type: SAVE_QUESTION_ANSWER_SUCCESS,
  payload: result,
});

export const reupdateQuestions1 = (
  result: QuestionAnswer
): SaveQuestionAnswerActions => ({
  type: RE_UPDATE_QUESTIONS_1,
  payload: result,
});

export const reupdateUsers1 = (result: any): SaveQuestionAnswerActions => ({
  type: RE_UPDATE_USERS_1,
  payload: result,
});

export const clearSaveQuestionAnswer = (): SaveQuestionAnswerActions => ({
  type: CLEART_SAVE_QUESTION_ANSWER,
});

export const setQuestionDetail = (
  info: SetQuestionDetail
): FetchQuestionsActions => ({
  type: SET_QUESTION_DETAIL,
  payload: info,
});

export const setDestinationUrl = (url: string): LoginActions => ({
  type: SET_DESTINATION_URL,
  payload: url,
});

export const submitLogin = (loginInfo: LoginInformation): LoginActions => ({
  type: SUBMIT_LOGIN,
  payload: loginInfo,
});

export const submitLogout = (): LoginActions => ({
  type: SUBMIT_LOGOUT,
});

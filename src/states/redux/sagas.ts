import { all, call, put, takeEvery } from "redux-saga/effects";
import {
  QuestionAnswer,
  QuestionInfo,
  QuestionsSchema,
  UsersSchema,
} from "../../@types/types";
import {
  getQuestions,
  getUsers,
  saveQuestion,
  saveQuestionAnswer,
} from "../../data/data";
import {
  createQuestionFail,
  createQuestionSuccess,
  fetchQuestionsFail,
  fetchQuestionsSuccess,
  fetchUsersFail,
  fetchUsersSuccess,
  reupdateQuestions,
  reupdateUsers,
  saveQuestionAnswerSuccess,
  saveQuestionAnswerFail,
  reupdateQuestions1,
  reupdateUsers1,
} from "./actions";
import {
  CREATE_QUESTION,
  FETCH_QUESTIONS,
  FETCH_USERS,
  SAVE_QUESTION_ANSWER,
} from "./types";

function* fetchUserFlow(): any {
  try {
    const result: UsersSchema = yield call(getUsers);
    yield put(fetchUsersSuccess(result));
  } catch (e: any) {
    yield put(fetchUsersFail(e));
  }
}

function* fetchQuestionsFlow(): any {
  try {
    const result: QuestionsSchema = yield call(getQuestions);
    yield put(fetchQuestionsSuccess(result));
  } catch (e: any) {
    yield put(fetchQuestionsFail(e));
  }
}

function* createQuestionFlow({ payload }: any): any {
  try {
    const result: QuestionInfo = yield call(saveQuestion, payload);
    yield put(createQuestionSuccess(result));
    yield put(reupdateQuestions(result));
    yield put(reupdateUsers({ uid: payload.author, qid: result.id }));
  } catch (e: any) {
    yield put(createQuestionFail(e));
  }
}

function* saveQuestionAnswerFlow({ payload }: any): any {
  try {
    const result: QuestionAnswer = yield call(saveQuestionAnswer, payload);
    yield put(saveQuestionAnswerSuccess(result));
    yield put(reupdateQuestions1(result));
    yield put(reupdateUsers1(result));
  } catch (e: any) {
    yield put(saveQuestionAnswerFail(e));
  }
}

function* mySaga() {
  yield all([
    takeEvery(FETCH_USERS, fetchUserFlow),
    takeEvery(FETCH_QUESTIONS, fetchQuestionsFlow),
    takeEvery(CREATE_QUESTION, createQuestionFlow),
    takeEvery(SAVE_QUESTION_ANSWER, saveQuestionAnswerFlow),
  ]);
}

export default mySaga;

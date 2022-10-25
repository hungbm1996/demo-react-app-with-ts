import { combineReducers } from "redux";
import { all, fork } from "redux-saga/effects";
import {
  login,
  users,
  questions,
  createQuestion,
  saveQuestionAnswer,
} from "./redux/reducers";
import mySaga from "./redux/sagas";

export const rootsReducers = combineReducers({
  users,
  login,
  questions,
  createQuestion,
  saveQuestionAnswer,
});
export function* rootsSaga() {
  yield all([fork(mySaga)]);
}

export type AppState = ReturnType<typeof rootsReducers>;

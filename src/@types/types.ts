export type AnswerInfo = Record<string, string>;

export interface UserInfo {
  id: string;
  name: string;
  avatarURL: string;
  answers: AnswerInfo;
  questions: string[];
}

export type UsersSchema = Record<string, UserInfo>;

export interface OptionsSchema {
  votes: string[];
  text: string;
}

export interface QuestionInfo {
  id: string;
  author: string;
  timestamp: number;
  optionOne: OptionsSchema;
  optionTwo: OptionsSchema;
}

export type QuestionsSchema = Record<string, QuestionInfo>;

export interface FormatQuestionType {
  author: string;
  optionOneText: string;
  optionTwoText: string;
}

export interface LoginInformation {
  id: string;
  name: string;
  avatarURL: string;
}

export interface QuestionAnswer {
  authedUser: string;
  qid: string;
  answer: string;
}

export type QuestionDetailInfo = {
  qid: string;
  uid: string;
} & Omit<QuestionInfo, 'id'> &
Omit<UserInfo, 'id'>;

export type LeaderBoard = UserInfo & {
  scoredByAnswered: number;
  scoredByCreated: number;
};

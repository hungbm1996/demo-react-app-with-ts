import {
  filter,
  forEach,
  get,
  isEmpty,
  map,
  merge,
  replace,
  reverse,
} from "lodash";
import {
  AnswerInfo,
  OptionsSchema,
  QuestionInfo,
  QuestionsSchema,
  UserInfo,
  UsersSchema,
} from "../@types/types";

type CustomUserAndQuestion = Pick<UserInfo, "id" | "name" | "avatarURL"> & {
  qid: string;
  option: string;
  optionOne: OptionsSchema;
  optionTwo: OptionsSchema;
};

export function generateUID() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export const convertObjectToUserList = (
  objectUsers: UsersSchema
): UserInfo[] => {
  return map(Object.values(objectUsers), (user) => {
    return { ...user };
  });
};

export const convertObjectToArray = <T extends unknown>(
  objectUsers: UsersSchema
): T[] => {
  return map(Object.values(objectUsers), (user): T => {
    return { ...user } as T;
  });
};

export const countScoreByAnsweredQuestion = (answers: AnswerInfo): number => {
  return Object.keys(answers).length;
};

export const countScoreByCreatedQuestion = (questions: string[]): number => {
  return questions.length;
};

export const getUnansweredQuestions = (questionsObject: QuestionsSchema) => {
  const convertObjectToArray = Object.values(questionsObject) as QuestionInfo[];
  return filter(convertObjectToArray, (question) => {
    const { optionOne, optionTwo } = question;
    return isEmpty(optionOne.votes) && isEmpty(optionTwo.votes);
  });
};

export const getAnsweredQuestions = (questionsObject: QuestionsSchema) => {
  const convertObjectToArray = Object.values(questionsObject) as QuestionInfo[];
  return filter(convertObjectToArray, (question) => {
    const { optionOne, optionTwo } = question;
    return !isEmpty(optionOne.votes) || !isEmpty(optionTwo.votes);
  });
};

export const getQuestionsDisplay = (
  questionsObject: QuestionsSchema,
  loginId: string
) => {
  const unansweredQuestions: QuestionInfo[] = [];
  const answeredQuestions: QuestionInfo[] = [];
  const convertToArray = reverse(Object.values(questionsObject));
  forEach(convertToArray, (question) => {
    const { optionOne, optionTwo } = question;
    const mergeOptions = merge(optionOne.votes, optionTwo.votes);
    const isAnsweredQuestion = mergeOptions.includes(loginId);
    if (isAnsweredQuestion) {
      answeredQuestions.push(question);
    } else {
      unansweredQuestions.push(question);
    }
  });
  return {
    unansweredQuestions,
    answeredQuestions,
  };
};

export const mappingQuestionWithUser = (
  questionArray: QuestionInfo[],
  usersObject: UsersSchema
): CustomUserAndQuestion[] => {
  const arrayMergeUserAndQuestion: CustomUserAndQuestion[] = [];
  forEach(questionArray, (question) => {
    const { id, author, optionOne, optionTwo } = question;
    const answersInfo = usersObject[author];
    const optionAnswerForQuestion = answersInfo.answers[id] || "optionOne";
    const optionText = get(question, [
      optionAnswerForQuestion,
      "text",
    ]) as string;
    const info = {
      id: answersInfo.id,
      name: answersInfo.name,
      avatarURL: answersInfo.avatarURL,
      qid: id,
      option: optionText,
      optionOne,
      optionTwo,
    };
    arrayMergeUserAndQuestion.push(info);
  });
  return arrayMergeUserAndQuestion;
};

export const buildClientUrl = (url: string, param: string, value: string) => {
  return replace(url, param, value);
};

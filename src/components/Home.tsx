import classNames from 'classnames';
import { map, split } from "lodash";
import React, { Fragment, useCallback, useMemo, useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { QuestionInfo } from "../@types/types";
import { useHandleOperation } from "../hooks/useHandleOperation";
import { selectors } from '../states/redux';
import { ANSWERED, DETAIL_QUESTION_URL, QUESTION_ID, UNANSWERED } from '../utils/constants';
import { buildClientUrl, generateUID, mappingQuestionWithUser } from "../utils/utils";
import { PollInformation } from "./PollInformation";

const { getQuestionsDisplaySelector } = selectors;

export const Home = React.memo(() => {
    const navigate = useNavigate();
    const { users, onSetQuestionInfo } = useHandleOperation();

    const { unansweredQuestions, answeredQuestions } = useSelector(getQuestionsDisplaySelector);

    const [ questionsStatus, setQuestionsStatus ] = useState<{
        id: string;
        questionsList: QuestionInfo[];
    }>({
        id: UNANSWERED,
        questionsList: unansweredQuestions,
    });

    const { id, questionsList } = useMemo(() => {
        return questionsStatus;
    }, [ questionsStatus ]);

    const result = useMemo(() => {
        return mappingQuestionWithUser(questionsList, users);
    }, [ questionsList, users ]);

    const handleChooseQuestionList = useCallback((event: any) => {
        const { id } = event.target;
        let questionsList;
        if (id === UNANSWERED) {
            questionsList = unansweredQuestions;
        } else {
            questionsList = answeredQuestions;
        }
        setQuestionsStatus({
            id,
            questionsList
        });
    }, [ answeredQuestions, unansweredQuestions ]);

    const handleViewPoll = useCallback((event: any) => {
        const { id } = event.target;
        const [ qid, uid ] = split(id, '--');
        onSetQuestionInfo(qid, uid);
        navigate(buildClientUrl(DETAIL_QUESTION_URL, QUESTION_ID, qid));
    }, [ navigate, onSetQuestionInfo ]);

    return (
        <div className="home">
            <div className="categories-question">
                <div
                    id={ UNANSWERED }
                    className={ classNames("unanswered", { "active": id === UNANSWERED }) }
                    onClick={ handleChooseQuestionList }>
                    Unanswered questions
                </div>
                <div
                    id={ ANSWERED }
                    className={ classNames("answered", { "active": id === ANSWERED }) }
                    onClick={ handleChooseQuestionList }>
                    Answered questions
                </div>
            </div>
            <div className="question-answer-list">
                { map(result, (user) => {
                    const { qid, id } = user;
                    return (
                        <Fragment key={ generateUID() }>
                            <PollInformation
                                id={ `${ qid }--${ id }` }
                                creator={ user.name }
                                avatarUrl={ user.avatarURL }
                                content={ user.option }
                                onViewPoll={ handleViewPoll } />
                            <br />
                        </Fragment>
                    );
                }) }
            </div>
        </div>);

});
import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { actions, selectors } from "../states/redux";
import { HOME_URL } from "../utils/constants";

const { clearSaveQuestionAnswer } = actions;
const { getQuestionDetailSelector, getNumberOfUser } = selectors;

export const QuestionAnswerResult = React.memo(() => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { questionId, userId } = useMemo(() => {
        const questionId = localStorage.getItem('questionId') as string;
        const userId = localStorage.getItem('userId') as string;
        return { questionId, userId };
    }, []);

    const { name, avatarURL, optionOne, optionTwo } = useSelector(
        getQuestionDetailSelector(questionId, userId));
    const numberOfUser = useSelector(
        getNumberOfUser);

    useEffect(() => {
        return () => {
            dispatch(clearSaveQuestionAnswer());
        };
    }, [ dispatch, navigate ]);

    const onBack = useCallback(() => {
        navigate(HOME_URL, { replace: true });
    }, [ navigate ]);

    const numberOfVotesForOptionOne = optionOne.votes.length;
    const numberOfVotesForOptionTwo = optionTwo.votes.length;

    return (
        <div className="poll-info">
            <h3 className="poll-creator">Ask by { name }</h3>
            <div className="poll-container">
                <div className="user-image">
                    <img src={ avatarURL } alt="User" />
                </div>
                <div className="information">
                    <h3>Result:</h3>
                    <div className="result-option-1">
                        <div>{ optionOne.text }</div>
                        <div className="progress-info">
                            <span style={ { width: '50px' } }>50%</span>
                            <div className="progress">
                                <div className="actual"></div>
                            </div>
                        </div>
                        <div>{ numberOfVotesForOptionOne } out of { numberOfUser } votes</div>
                    </div>
                    <br />
                    <div className="result-option-2">
                        <div>{ optionTwo.text }</div>
                        <div className="progress-info">
                            <span style={ { width: '50px' } }>50%</span>
                            <div className="progress">
                                <div className="actual"></div>
                            </div>
                        </div>
                        <div>{ numberOfVotesForOptionTwo } out of { numberOfUser } votes</div>
                    </div>
                </div>
            </div>
            <button
                type="button"
                className="btn"
                onClick={ onBack }>
                Back to home
            </button>
        </div>
    )
        ;
});

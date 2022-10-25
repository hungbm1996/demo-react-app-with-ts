import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { HandleQuestion, withHandleQuestion } from "../hocs/withHandleQuestion";
import { actions, selectors } from "../states/redux";
import { ANSWERED_RESULT_URL } from "../utils/constants";

type RadioButtonProps = {
    reference: any;
    id: string;
    name: string;
    label: string;
};

const { saveQuestionAnswer, clearSaveQuestionAnswer } = actions;

const {
    getLoginUserSelector,
    getQuestionDetailSelector,
    getSaveQuestionAnswerSelector,
} = selectors;

const RadioButton = React.memo((props: RadioButtonProps) => {
    const { reference, id, name, label } = props;
    return (
        <div className="radio-button-wrap">
            <input ref={ reference } type="radio" id={ id } name={ name } value={ id } />
            <label htmlFor={ id }>{ label }</label>
        </div>
    );
});

export const QuestionDetail = withHandleQuestion(React.memo(({ questionId }: HandleQuestion) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const optionRef = useRef<HTMLInputElement>(null);

    const { id: loginId } = useSelector(getLoginUserSelector);
    const saveQuestionAnswerResult = useSelector(getSaveQuestionAnswerSelector);

    const userId = useMemo(() => {
        return localStorage.getItem('userId') as string;
    }, []);

    const { qid, name, avatarURL, optionOne, optionTwo } = useSelector(
        getQuestionDetailSelector(questionId, userId));

    useEffect(() => {
        if (saveQuestionAnswerResult) {
            navigate(ANSWERED_RESULT_URL, { replace: true });
        }
        return () => {
            dispatch(clearSaveQuestionAnswer());
        };
    }, [ dispatch, navigate, saveQuestionAnswerResult ]);

    const handleSubmitPoll = useCallback(() => {
        dispatch(saveQuestionAnswer({
            authedUser: loginId,
            qid,
            answer: optionRef.current?.value as string
        }));
    }, [ dispatch, loginId, qid ]);

    return (
        <div className="poll-info">
            <h3 className="poll-creator">{ name } ask:</h3>
            <div className="poll-container">
                <div className="user-image">
                    <img src={ avatarURL } alt="User" />
                </div>
                <div className="information">
                    <h3>Would you rather ...</h3>
                    <div>
                        <RadioButton
                            reference={ optionRef }
                            id="optionOne" name="option" label={ optionOne.text } />
                        <RadioButton
                            reference={ optionRef }
                            id="optionTwo" name="option" label={ optionTwo.text } />
                    </div>
                    <button type="button" className="button-submit-poll"
                        onClick={ handleSubmitPoll }>Submit</button>
                </div>
            </div>
        </div>
    );
}));

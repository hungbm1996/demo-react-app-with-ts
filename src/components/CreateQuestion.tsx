import React, { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useHandleOperation } from "../hooks/useHandleOperation";
import { HOME_URL } from "../utils/constants";

export const CreateQuestion = React.memo(() => {
    const navigate = useNavigate();

    const optionOneRef = useRef<HTMLInputElement>(null);
    const optionTwoRef = useRef<HTMLInputElement>(null);

    const { questionInfo, onCreateQuestion, onClearCreateQuestion } = useHandleOperation();

    useEffect(() => {
        if (questionInfo) {
            navigate(HOME_URL, { replace: true });
            return () => {
                onClearCreateQuestion();
            };
        }
    }, [ questionInfo, navigate, onClearCreateQuestion ]);

    const handleCreateQuestion = useCallback(() => {
        const optionOne = optionOneRef.current?.value.trim();
        const optionTwo = optionTwoRef.current?.value.trim();
        if (optionOne && optionTwo) {
            return onCreateQuestion(optionOne, optionTwo);
        }
        return alert('Please input data for option one and option two');
    }, [ onCreateQuestion ]);

    return <form action="/action_page.php">
        <h3 style={ { textAlign: 'center', paddingBottom: '20px' } }>
            Would You Rather ...
        </h3>
        <input
            ref={ optionOneRef }
            type="text"
            name="optionOne"
            placeholder="Enter option one text, here" />
        <label style={ { fontWeight: 'bold' } }>OR</label>
        <input
            ref={ optionTwoRef }
            type="text"
            name="optionTwo"
            placeholder="Enter option one two, here" />
        <button
            type="button"
            className="btn"
            onClick={ handleCreateQuestion }>
            Create question
        </button>
    </form>;
});

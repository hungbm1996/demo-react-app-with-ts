import { map } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { selectors } from '../states/redux';
import {
    countScoreByAnsweredQuestion,
    countScoreByCreatedQuestion,
    generateUID
} from "../utils/utils";

const { getLeaderBoardUsersSelector } = selectors;

export const LeaderBoard = React.memo(() => {
    const leaderBoardOfUsers = useSelector(getLeaderBoardUsersSelector);

    return (
        <ul>
            { map(leaderBoardOfUsers, (user) => {
                const { name, avatarURL, answers, questions } = user;
                const scoredByAnswered = countScoreByAnsweredQuestion(answers);
                const scoredByCreated = countScoreByCreatedQuestion(questions);

                return (
                    <li key={ generateUID() } className="item_wrap male online">
                        <div className="item">
                            <div className="item_left" style={ { width: '20%' } }>
                                <img src={ avatarURL } alt="" />
                            </div>
                            <div className="item_middle" style={ { width: '60%' } }>
                                <h2>{ name }</h2>
                                <p className="name">Answered questions: { scoredByAnswered }</p>
                                <p className="distance">Created questions: { scoredByCreated }</p>
                            </div>
                            <div className="item_right" style={ { width: '20%' } }>
                                <p>Score: { scoredByAnswered + scoredByCreated }</p>
                            </div>
                        </div>
                    </li>);

            }) }
        </ul >
    )
        ;
});

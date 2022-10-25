import React, { MouseEventHandler } from "react";

type PollInformationProps = {
    id: string;
    creator: string;
    avatarUrl: string;
    content: string;
    onViewPoll: MouseEventHandler<HTMLButtonElement>;
};

export const PollInformation = React.memo((props: PollInformationProps) => {
    const { id, creator, avatarUrl, content, onViewPoll } = props;
    return (
        <div className="poll-info">
            <h3 className="poll-creator">{ creator } ask:</h3>
            <div className="poll-container">
                <div className="user-image">
                    <img src={ avatarUrl } alt="User" />
                </div>
                <div className="information">
                    <h3>Would you rather</h3>
                    <div>{ content }</div>
                    <button type="button" id={ id } className="button-view-poll"
                        onClick={ onViewPoll }>View poll</button>
                </div>
            </div>
        </div>
    )
        ;
});

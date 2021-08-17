import React, { useEffect} from 'react';
import { User, TimeAgo, Text }  from '../- Shared -/AllSharedComponents';
import { FakeComment } from '../- Placeholders -/FakeComment';
import { getItem } from '../../API/ApiCalls';
import { themedClass } from '../../Utilities/helperFunctions';
import { useSelector, useDispatch } from 'react-redux';
import { getComment, getRepliesCount, collapseExpandComment } from '../../Store/actions';

export function StoryComment({ commentID }) {

    const dispatch = useDispatch();

    const { dark, modern } = useSelector(state => state.theme);

    const commentToDisplay = useSelector(state => state.comments.find(comment => comment.item.id === commentID));

    const commentIsExpanded = useSelector(state => !state.collapsedComments.includes(commentID));

    const abortController = new AbortController();

    const abortSignal = abortController.signal;

    useEffect(() => {
        !commentToDisplay && getItem(commentID, abortSignal).then(res => dispatch(getComment(res)));
        return () => abortController.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [commentID]);

    if (!commentToDisplay) return <FakeComment />;

    const { status, item, repliesCount } = commentToDisplay;

    if (!item || item.dead || item.deleted) return null;
    
    return (
        status && status === 'isLoaded' ?
            <article className={themedClass('story-comment', dark, modern)}>
                <div className={themedClass('story-comment-top-wrap', dark, modern)}>
                    <User user={item.by} />&nbsp;
                    <TimeAgo time={item.time}/>&ensp;
                    <p 
                        className={themedClass('comment-exp-collapse', dark, modern)}
                        onClick={() => {
                            dispatch(collapseExpandComment(commentID));
                            dispatch(getRepliesCount(commentID))
                        }}
                    >
                      {commentIsExpanded ? `[ - ]` : `[ ${repliesCount} more ]`}
                    </p>
                </div> 
                {
                    commentIsExpanded &&
                        <React.Fragment>
                            <div className={themedClass('story-comment-bot-wrap', dark, modern)}>
                                <Text text={item.text} />
                            </div>
                            {
                                item.kids && item.kids.map(kidID => 
                                    <StoryComment key={kidID} commentID={kidID} />
                                )
                            }
                        </React.Fragment>
                }
            </article>
        :   <FakeComment />
    )
}
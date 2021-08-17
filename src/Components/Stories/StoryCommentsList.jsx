import { StoryComment } from './StoryComment';

export function StoryCommentsList({ commentsIDs }) {
    
    const commentsList = commentsIDs.map(commentID => 
        <li key={commentID} className='story-comments-li'>
            <StoryComment commentID={commentID} />
        </li>
    );

    return (
        <ul className='story-comments-ul'>
            {commentsList}
        </ul>
    );
}

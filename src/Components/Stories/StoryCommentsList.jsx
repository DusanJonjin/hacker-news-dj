import { StoryComment } from './StoryComment';
import { themedClass } from '../../Utilities/helperFunctions';
import '../../Styles/Stories/StoryCommentsList.css';

export function StoryCommentsList({ commentsIDs, dark, modern }) {
    
    const commentsList = commentsIDs.map(commentID => 
        <li 
            key={commentID} 
            className={'story-comments-li'}
        >
            <StoryComment commentID={commentID} />
        </li>
    );

    return (
        <ul className={themedClass('story-comments-ul', dark, modern)}>
            {commentsList}
        </ul>
    );
}

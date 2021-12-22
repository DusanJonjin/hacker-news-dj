import { StoryComment } from './StoryComment';
import { themedClass } from '../../Utilities/helperFunctions';
import '../../Styles/Stories/StoryCommentsList.css';

export function StoryCommentsList({ commentsIDs, dark, modern }) {

    return (
        <ul className={themedClass('story-comments-ul', dark, modern)}>
            {commentsIDs.map(commentID => 
                <li key={commentID} className={'story-comments-li'}>
                    <StoryComment commentID={commentID} />
                </li>
            )}
        </ul>
    );
}

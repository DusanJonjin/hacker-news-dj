import {
    Title,
    StorysDomain,
    Score,
    User,
    TimeAgo
} from '../- Shared -/AllSharedComponents';
import { useSelector } from 'react-redux';
import { getDomainFromUrl, themedClass } from '../../Utilities/helperFunctions';
import '../../Styles/Stories/StoryDetails.css';

export function StoryDetails({ storyItem }) {

    const {
        url,
        title,
        score,
        by,
        time
    } = storyItem;

    const { dark, modern } = useSelector(state => state.theme);

    const domain = getDomainFromUrl(url);

    return (
        <article className={themedClass('story-comm-details', dark, modern)}>
            <div className={themedClass('story-comm-details-top-wrap', dark, modern)}>
                <Title 
                    storyUrl={url}
                    title={title}
                    dark={dark}
                />
                <StorysDomain
                    domain={domain}
                    modern={modern}
                />
            </div>
            <div className={themedClass('story-comm-details-bot-wrap', dark, modern)}>
                <Score score={score} />
                <User 
                    user={by}
                    byWord='by:'
                />
                <TimeAgo time={time}/>
            </div>
        </article>
    );
}

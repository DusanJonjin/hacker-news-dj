import {
    Title,
    StorysDomain,
    Score,
    User,
    TimeAgo
} from '../- Shared -/AllSharedComponents';
import { useSelector } from 'react-redux';
import { getDomainFromUrl } from '../../Utilities/helperFunctions';
//import './Styles/StoryDetails.css';

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
        <article className={`story-comm-details-box`}>
            <Title 
                storyUrl={url}
                title={title}
                dark={dark}
            />
            <StorysDomain
                domain={domain}
                darkTheme={dark}
            />
            <div className={`story-comm-details-bot-wrap`}>
                <div>
                    <Score score={score}/>&ensp;|&ensp;
                    <User 
                        user={by}
                        byWord='by:'
                    />
                </div>
                <TimeAgo time={time}/>
            </div>
        </article>
    );
}

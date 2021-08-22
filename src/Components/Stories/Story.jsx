import { useState, useEffect  } from 'react';
import {
    Title,
    StorysDomain,
    Score,
    User,
    TimeAgo,
    CommentsCount
} from '../- Shared -/AllSharedComponents';
import { FakeStory } from '../- Placeholders -/FakeStory';
import { getItem } from '../../API/ApiCalls';
import { usePreventSetStateOnUnmount } from '../../Hooks/PreventSetStateOnUnmount';
import { getDomainFromUrl, themedClass } from '../../Utilities/helperFunctions';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../Styles/Stories/Story.css';

export function Story({ storyID, storyNum, pageNum, storiesURL }) {
    
    const { dark, modern } = useSelector(state => state.theme);

    const [story, setStory] = useState({status: 'isLoading', item: {}});

    const { isMounted, abortController, abortSignal } = usePreventSetStateOnUnmount();

    useEffect(() => {
        getItem(storyID, abortSignal).then(res => isMounted.current && setStory(res));
        return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { status, item } = story;

    if (!item) return <FakeStory dark={dark} modern={modern}/>

    const storyCommentsLink = {
        pathname: pageNum === 1 ? `${storiesURL}/itemId=${item.id}` : `${storiesURL}/page_${pageNum}/itemId=${item.id}`
    }

    const domain = getDomainFromUrl(item.url);

    const linkDisabled = !item.descendants && !item.text;

    return (
        status === 'isLoading' ? <FakeStory dark={dark} modern={modern}/> :
            <article className={themedClass('story', dark, modern)}>
                <p className={themedClass('story-num', dark, modern)}>
                    {storyNum}{!modern && '.'}
                </p>
                <div className={themedClass('story-top-wrap', dark, modern)}>
                    <Title 
                        storyUrl={item.url}
                        title={item.title}
                        dark={dark}
                    />
                    <StorysDomain 
                        domain={domain} 
                        dark={dark} 
                        modern={modern}
                    />             
                </div> 
                <div className={themedClass('story-bottom-wrap', dark, modern)}>
                    <Score score={item.score}/>
                    <User user={item.by}
                        byWord='by:'
                    />         
                    <TimeAgo time={item.time} />                  
                    <Link 
                        to={storyCommentsLink} 
                        className={`story-comments-link ${linkDisabled ? 'link-disabled' : '' }`}
                    >
                        <CommentsCount 
                            descendants={item.descendants}
                            linkDisabled={linkDisabled}
                        />
                    </Link>
                </div>           
            </article>
    )
}

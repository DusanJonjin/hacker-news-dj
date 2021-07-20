import { useState, useEffect  } from 'react';
import {
    Title,
    StorysDomain,
    Score,
    User,
    TimeAgo,
    CommentsCount
} from '../- Shared  -/AllSharedComponents';
import { FakeStory } from '../- Placeholders -/FakeStory';
import { getItem } from '../../API/ApiCalls';
import { usePreventSetStateOnUnmount } from '../../Hooks/PreventSetStateOnUnmount';
import { handleDomainFromUrl } from '../../Utilities/helperFunctions';
import { Link } from 'react-router-dom';
import '../../Styles/Stories/Story.css';


export function Story({ storyID, storyNum, pageNum, storiesUrl }) {

    const [story, setStory] = useState({status: 'isLoading', item: {}});

    const { isMounted, abortController, abortSignal } = usePreventSetStateOnUnmount();

    useEffect(() => {
        getItem(storyID, abortSignal).then(res => isMounted.current && setStory(res));
        return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { status, item } = story;

    if (!item) return <FakeStory />

    const storyCommentsLink = {
        pathname: pageNum === 1 ? `${storiesUrl}/itemId=${item.id}` : `${storiesUrl}/page_${pageNum}/itemId=${item.id}`
    }

    const domain = handleDomainFromUrl(item.url);

    return (
        status === 'isLoading' ? <FakeStory /> :
            <article className={`story`}>
                <p className={`story-num`}>
                    {storyNum}
                </p>
                <div className={`story-top-wrap`}>
                    <Title 
                        storyUrl={item.url}
                        title={item.title}
                    />
                    <StorysDomain domain={domain} />             
                </div> 
                <div className={`story-bottom-wrap`}>
                    <div className={`small-wrap-one`}>
                        <Score score={item.score}/>
                        <User user={item.by}
                            byWord='by:'
                        />
                    </div>              
                    <div className={`small-wrap-two`}>
                        <TimeAgo time={item.time} />                  
                        <Link 
                            to={storyCommentsLink} 
                            className={`story-comments-link`}>
                            <CommentsCount 
                                descendants={item.descendants}
                            />
                        </Link>
                    </div>
                </div>           
            </article>
    )
}

import React, { useState, useEffect } from 'react';
import { CommentsCount } from '../- Shared -/CommentsCount';
import { Text } from '../- Shared -/Text';
import { StoryDetails } from './StoryDetails';
import { StoryCommentsList } from './StoryCommentsList';
import { getItem } from '../../API/ApiCalls';
import { usePreventSetStateOnUnmount } from '../../Hooks/PreventSetStateOnUnmount';
import { useLocation } from 'react-router-dom';


export function StoryComments() {

    const { pathname } = useLocation();

    const storyId = pathname.slice(pathname.indexOf('=') + 1);

    const [story, setStory] = useState({status: 'isLoading', item: {}});

    const { isMounted, abortController, abortSignal } = usePreventSetStateOnUnmount();

    useEffect(() => {
        getItem(storyId, abortSignal).then(res =>
            isMounted.current && setStory(res)
        );
        return () => {
            abortController.abort();
        }       
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storyId]);

    const { status, item } = story;

    if(!item) return <p>No story</p>

    return (
        <section className='story-comments-wrap'>
            {
                {
                    'isLoading': 
                        <React.Fragment>
                            <p className={`fake-story-comm-details`}> </p>
                        </React.Fragment>,
                    'error': 
                        <p className='error'>
                            Network error. Refresh the browser, or try again later.
                        </p>,
                    'isLoaded':
                        <div className={`details-comments-wrap`}>
                            <StoryDetails 
                                storyItem={item}
                                
                            />
                            {item.text &&
                                <div className='details-comments-text'>
                                    <Text text={item.text} />
                                </div>
                            }
                            <CommentsCount 
                                descendants={item.descendants} 
                            />
                            <StoryCommentsList commentsIDs={item.kids} />            
                        </div>
                }[status]
            }
        </section>
    );
}

import React, { useState, useEffect } from 'react';
import { CommentsCount } from '../- Shared -/CommentsCount';
import { Text } from '../- Shared -/Text';
import { StoryDetails } from './StoryDetails';
import { StoryCommentsList } from './StoryCommentsList';
import { FakeStoryDetails } from '../- Placeholders -/FakeStoryDetails';
import { FakeCommentsList } from '../- Placeholders -/FakeCommentsList';
import { getItem } from '../../API/ApiCalls';
import { usePreventSetStateOnUnmount } from '../../Hooks/PreventSetStateOnUnmount';
import { themedClass } from '../../Utilities/helperFunctions';
import { useSelector, useDispatch } from 'react-redux';
import { clearComments, clearCollapsedComments } from '../../Store/actions';
import { useLocation } from 'react-router-dom';
import '../../Styles/Stories/StoryComments.css';


export function StoryComments() {

    const dispatch = useDispatch();

    const { dark, modern } = useSelector(state => state.theme);

    const { pathname } = useLocation();

    const storyId = parseInt(pathname.slice(pathname.indexOf('=') + 1));

    const [story, setStory] = useState({status: 'isLoading', item: {}});

    const { isMounted, abortController, abortSignal } = usePreventSetStateOnUnmount();

    useEffect(() => {
        getItem(storyId, abortSignal).then(res =>
            isMounted.current && setStory(res)
        );
        return () => {
            abortController.abort();
            dispatch(clearComments());
            dispatch(clearCollapsedComments());
        }       
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storyId]);

    const { status, item } = story;

    if(!item) return <p>Story doesn't exist</p>;

    return (
        <section className={themedClass('story-comments-wrap', dark, modern)}>
            {
                {
                    'isLoading': 
                        <React.Fragment>
                            <FakeStoryDetails dark={dark} modern={modern} />
                            <div className={themedClass('fake-comments-count', dark, modern)}></div>
                            <FakeCommentsList dark={dark} modern={modern} />
                        </React.Fragment>,
                    'error': 
                        <p className='error'>
                            Network error. Refresh the browser, or try again later.
                        </p>,
                    'isLoaded':
                        <div className={themedClass('details-comments-wrap', dark, modern)}>
                            <StoryDetails 
                                storyItem={item}
                                
                            />
                            {item.text &&
                                <div className={themedClass('details-comments-text', dark, modern)}>
                                    <Text text={item.text} />
                                </div>
                            }
                            <CommentsCount 
                                descendants={item.descendants} 
                                clsName='details-comm-count'
                            />
                            {item.kids && 
                                <StoryCommentsList 
                                    commentsIDs={item.kids}
                                    dark={dark}
                                    modern={modern}
                                />            
                            }
                        </div>
                }[status]
            }
        </section>
    );
}

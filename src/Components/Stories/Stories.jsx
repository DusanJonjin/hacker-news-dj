import React, { useState, useEffect } from 'react';
import { StoriesList } from './StoriesList';
import { StoriesPaginate } from './StoriesPaginate';
import { StoryComments } from './StoryComments';
import { FakeStoriesList } from '../- Placeholders -/FakeStoriesList';
import { getStoriesIDs } from '../../API/ApiCalls';
import { usePreventSetStateOnUnmount } from '../../Hooks/PreventSetStateOnUnmount';
import { useLocation, useRouteMatch } from 'react-router';

export function Stories({ storiesApiName }) {

    const { pathname } = useLocation();

    const { url } = useRouteMatch();

    const pageNum = !pathname.includes('page') ? 1 : parseInt(pathname.slice(pathname.indexOf('_') + 1));

    const initialStoriesObj = {status: 'isLoading', ids: [], count: 0};

    const [storiesObj, setStoriesObj] = useState(initialStoriesObj);

    // eslint-disable-next-line no-unused-vars
    const [storiesPerPage, setStoriesPerPage] = useState(20);

    const { isMounted, abortController, abortSignal } = usePreventSetStateOnUnmount();

    useEffect(() => {
        setStoriesObj(initialStoriesObj);
        getStoriesIDs(
            storiesApiName, 
            abortSignal,
            pageNum,
            storiesPerPage
        ).then(res => isMounted.current && setStoriesObj(res)); 
        window.scrollTo(0, 0);
        // If a user quickly clicks on a paginate button and then some nav link:
        return () => abortController.abort();     
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNum, storiesApiName]);

    const { status, ids, count } = storiesObj;

    return (
        <section className='stories-with-comments'>
            {
                {  
                    'isLoading': 
                        <FakeStoriesList />, 
                    'error':
                        <p className='error'>
                            Network error. Refresh the browser, or try again later.
                        </p>,
                    'isLoaded':
                        <React.Fragment>
                            <StoriesList 
                                storiesIDs={ids}
                                pageNum={pageNum}
                                storiesPerPage={storiesPerPage}
                                storiesURL={url}
                            />
                            <StoriesPaginate />
                        </React.Fragment>
                }[status]
            }
        </section>
    )
}

import React, { useState, useEffect } from 'react';
import { StoriesList } from './StoriesList';
import { StoriesPaginate } from './StoriesPaginate';
import { StoryComments } from './StoryComments';
import { FakeStoriesList } from '../- Placeholders -/FakeStoriesList';
import { getStoriesIDs } from '../../API/ApiCalls';
import { usePreventSetStateOnUnmount } from '../../Hooks/PreventSetStateOnUnmount';
import { Switch, Route, useLocation, useRouteMatch } from 'react-router';

export function Stories({ storiesApiName }) {

    const { pathname } = useLocation();

    const { url } = useRouteMatch();

    const pageNum = !pathname.includes('page') ? 1 : parseInt(pathname.slice(pathname.indexOf('_') + 1));

    const initialStoriesObj = {status: 'isLoading', ids: [], count: 0};

    const [storiesObj, setStoriesObj] = useState(initialStoriesObj);

    // eslint-disable-next-line no-unused-vars
    const [storiesPerPage, setStoriesPerPage] = useState(20);

    const [midBtnsArr, setMidBtnsArr] = useState([]);

    const initialBtnsArr = (storiesCount, pageNum) => {
        const pagesCount = Math.ceil(storiesCount / storiesPerPage);
        if (pagesCount < 8) return Array.from({length: pagesCount}, (v, i) => i + 1);
        return Array.from({length: 5}, (v, i) => i + 2);
    }

    const handleMidBtnsArr = array => {
        setMidBtnsArr(array)
    };

    const { isMounted, abortController, abortSignal } = usePreventSetStateOnUnmount();

    useEffect(() => {
        setStoriesObj(initialStoriesObj);
        getStoriesIDs(storiesApiName, abortSignal, pageNum, storiesPerPage).then(res => 
            isMounted.current && (
                setStoriesObj(res),
                midBtnsArr.length < 1 && 
                setMidBtnsArr(initialBtnsArr(res.count))
            )
        ); 
        window.scrollTo(0, 0);
        // If a user quickly clicks on a paginate button and then on some nav link:
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
                        <Switch>
                            <Route exact path={pageNum === 1 ? url : `${url}/page_:PageNum`}>
                                <React.Fragment>
                                    <StoriesList 
                                        storiesIDs={ids}
                                        pageNum={pageNum}
                                        storiesPerPage={storiesPerPage}
                                        storiesURL={url}
                                    />
                                    <StoriesPaginate
                                        pageNum={pageNum}
                                        storiesCount={count}
                                        midBtnsArr={midBtnsArr}
                                        handleMidBtnsArr={handleMidBtnsArr} 
                                        storiesPerPage={storiesPerPage}
                                        storiesURL={url}                  
                                    />
                                </React.Fragment>
                            </Route>
                            <Route exact path={pageNum === 1 ? `${url}/itemId=:StoryId` : `${url}/page_:PageNum/itemId=:StoryId`}>
                                <StoryComments />
                            </Route>
                            <Route path='*'>
                                <h2>Invalid URL!</h2>
                            </Route>
                        </Switch>
                }[status]
            }
        </section>
    )
}

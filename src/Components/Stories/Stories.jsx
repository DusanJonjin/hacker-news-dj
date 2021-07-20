import React, { useState, useEffect } from 'react';
import { StoriesList } from './StoriesList';
import { StoriesPaginate } from './StoriesPaginate';
import { StoryComments } from './StoryComments';
import { FakeStoriesList } from '../- Placeholders -/FakeStoriesList';
import { getStoriesIDs } from '../../API/ApiCalls';
import { usePreventSetStateOnUnmount } from '../../Hooks/PreventSetStateOnUnmount';
import { Switch, Route, useLocation, useRouteMatch } from 'react-router';
import '../../Styles/Stories/Stories.css';

export function Stories({ storiesApiName }) {

    const { pathname } = useLocation();

    const { url } = useRouteMatch();

    const pageNum = !pathname.includes('page') ? 1 : parseInt(pathname.slice(pathname.indexOf('_') + 1));

    const initialStoriesObj = {status: 'isLoading', ids: [], count: 0};

    const [storiesObj, setStoriesObj] = useState(initialStoriesObj);

    // eslint-disable-next-line no-unused-vars
    const [storiesPerPage, setStoriesPerPage] = useState(20);

    const [paginateMidBtns, setPaginateMidBtns] = useState([]);

    const initialMidBtns = (storiesCount, pageNum) => {
        const pagesCount = Math.ceil(storiesCount / storiesPerPage);
        if (pagesCount < 8) return Array.from({length: pagesCount}, (_, i) => i + 1);
        const midBtnsCount = 5;
        const initialBtns = Array.from({length: midBtnsCount}, (_, i) => {
            if (pageNum <= midBtnsCount) return (i + 2);
            if (pageNum >= pagesCount - (midBtnsCount - 1)) return (i + (pagesCount - midBtnsCount));
            return (i + (pageNum - 2));
        })
        return initialBtns;
    }

    const handleMidBtns = array => {
        setPaginateMidBtns(array)
    };

    const { isMounted, abortController, abortSignal } = usePreventSetStateOnUnmount();

    useEffect(() => {
        setStoriesObj(initialStoriesObj);
        getStoriesIDs(storiesApiName, abortSignal, pageNum, storiesPerPage).then(res => 
            isMounted.current && (
                setStoriesObj(res),
                paginateMidBtns.length < 1 && 
                setPaginateMidBtns(initialMidBtns(res.count, pageNum))
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
                                        midBtns={paginateMidBtns}
                                        handleMidBtns={handleMidBtns} 
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

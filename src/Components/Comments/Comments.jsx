import React, { useState, useEffect} from 'react';
import { CommentsList } from './CommentsList';
import { CommentsPaginate } from './CommentsPaginate';
import { FakeCommentsList } from '../- Placeholders -/FakeCommentsList';
import { themedClass } from '../../Utilities/helperFunctions';
import { usePreventSetStateOnUnmount } from '../../Hooks/PreventSetStateOnUnmount';
import { getMaxItem } from '../../API/ApiCalls';
import { useSelector } from 'react-redux';
import { Switch, Route, useLocation, useRouteMatch } from 'react-router';
import '../../Styles/Comments/Comments.css';

export function Comments() {

    const { dark, modern } = useSelector(state => state.theme);

    const { pathname } = useLocation();

    const { url } = useRouteMatch();

    const pageNum = !pathname.includes('page') ? 1 : parseInt(pathname.slice(pathname.indexOf('_') + 1));

    // eslint-disable-next-line no-unused-vars
    const [itemsIdCount, setItemsIdCount] = useState(20);

    const initialItemsObj = {
        status: 'isLoading',
        maxItemID: 0,
        ids: []
    };

    const [itemsObj, setItemsObj] = useState(initialItemsObj);

    const initializeMaxItemWithIds = (pageNum, maxItem) => {
        const { maxItemID } = maxItem;
        if (!maxItemID) setItemsObj(maxItem);
        const ids = Array.from({length: itemsIdCount}, (_, i) =>
            (maxItemID - i) - (pageNum - 1) * itemsIdCount
        );
        setItemsObj({...maxItem, ids});
    }

    const { isMounted, abortController, abortSignal } = usePreventSetStateOnUnmount();

    useEffect(() => {
        setItemsObj(initialItemsObj);
        getMaxItem(abortSignal).then(res => 
            isMounted.current && initializeMaxItemWithIds(pageNum, res)
        );
        return () => abortController.abort();   
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNum])

    const { status, ids } = itemsObj;

 return (
        <section className={themedClass('comments', dark, modern)}>
            {
                {
                    'isLoading': 
                        <FakeCommentsList />,
                    'error': 
                        <p className='error'>
                            Network error. Refresh the browser, or try again later.
                        </p>,
                    'isLoaded': 
                        <Switch>
                            <Route exact path={pageNum === 1 ? url : `${url}/page_:PageNum`}>
                                <React.Fragment>
                                    <CommentsList 
                                        itemsIDs={ids} 
                                        dark={dark} 
                                        modern={modern} 
                                    />
                                    <CommentsPaginate pageNum={pageNum} />
                                </React.Fragment>
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

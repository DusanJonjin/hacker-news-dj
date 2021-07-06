import React, { useState, useEffect }from 'react';
import { StoriesList } from './StoriesList';
import { StoriesPaginate } from './StoriesPaginate';

export function Stories() {

    const [storiesObj, setStoriesObj] = useState({status: 'isLoading', ids: [], count: 0});

    return (
        <React.Fragment>
            <StoriesList />
            <StoriesPaginate />
        </React.Fragment>
    )
}

import React from 'react';
import { StoriesList } from './StoriesList';
import { StoriesPaginate } from './StoriesPaginate';

export function Stories() {


    return (
        <React.Fragment>
            <StoriesList />
            <StoriesPaginate />
        </React.Fragment>
    )
}

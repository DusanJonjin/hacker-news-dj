import React from 'react';
import { CommentsList } from './CommentsList';
import { CommentsPaginate } from './CommentsPaginate';

export function Comments() {
    return (
        <React.Fragment>
            <CommentsList />
            <CommentsPaginate />
        </React.Fragment>
    )
}

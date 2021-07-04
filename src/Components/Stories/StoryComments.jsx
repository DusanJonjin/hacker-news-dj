import React from 'react';
import { StoryDetails } from './StoryDetails';
import { StoryCommentsList } from './StoryCommentsList';

export function StoryComments() {

    return (
        <div className={`details-comments-wrap`}>
            <StoryDetails />
            <StoryCommentsList />
        </div>
    )
}

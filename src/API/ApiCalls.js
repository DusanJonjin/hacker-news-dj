const mainURL = 'https://hacker-news.firebaseio.com/v0';

// Async function to get all top stories or new stories id's in array:
export const getStoriesIDs = async (storiesApiName, abortSignal, pageNum, storiesPerPage) =>  {
    try {
        const fetchStoriesIDs = await fetch(
            `${mainURL}/${storiesApiName}.json?print=pretty`, {signal: abortSignal}
        );
        const responseIds = await fetchStoriesIDs.json();
        const cleanIds = responseIds.filter(id => id);
        const count = cleanIds.length;
        const storiesToNum = pageNum * storiesPerPage;
        const storiesFromNum = storiesToNum - storiesPerPage;
        const ids = cleanIds.slice(storiesFromNum, storiesToNum);
        return {status: 'isLoaded', ids, count};
    }

    catch (err) {
        if (err.name === 'AbortError') return {status: 'isLoading'};
        return {status: 'error'}
    }
};
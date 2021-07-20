import { Story } from './Story';
import '../../Styles/Stories/StoriesList.css';

export function StoriesList({ storiesIDs, pageNum, storiesPerPage, storiesURL }) {

    const storiesList = storiesIDs.map((storyID, index) => {
        const storyNum = ((pageNum - 1) * storiesPerPage + (index + 1));
        return (
            <li 
                key={storyID}
                className='stories-li'
            >
                <Story 
                    storyID={storyID}
                    storyNum={storyNum}
                    pageNum={pageNum}
                    storiesURL={storiesURL}              
                />
            </li>
        )
    })

    return (
        <ol className='stories-ol'>
            {storiesList}
        </ol>
    )
}

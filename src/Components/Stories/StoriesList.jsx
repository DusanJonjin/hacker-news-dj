import { Story } from './Story';
import { useSelector } from 'react-redux';
import { themedClass } from '../../Utilities/helperFunctions';
import '../../Styles/Stories/StoriesList.css';

export function StoriesList({ storiesIDs, pageNum, storiesPerPage, storiesURL }) {

    const { dark, modern } = useSelector(state => state.theme);

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
        <ol className={themedClass('stories-ol', dark, modern)}>
            {storiesList}
        </ol>
    )
}

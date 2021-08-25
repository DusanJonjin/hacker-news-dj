import { FakeComment } from './FakeComment';
import { themedClass } from '../../Utilities/helperFunctions';
import { useSelector } from 'react-redux';

export function FakeCommentsList({ commentsCount=20 }) {

    const { dark, modern } = useSelector(state => state.theme);

    //Create an arbitary array of thirty values 
    const fakeCommentsArr = Array.from({length: commentsCount}, (v, i) => i);

    const fakeCommentsList = fakeCommentsArr.map(num => 
        <li key={num} className={'story-comments-li'}>
            <FakeComment />
        </li>
    );

    return (
        <ul className={themedClass('story-comments-ul', dark, modern)}>
            {fakeCommentsList}
        </ul>
    )
}

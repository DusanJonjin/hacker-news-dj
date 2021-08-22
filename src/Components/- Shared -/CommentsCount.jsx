import { themedClass } from "../../Utilities/helperFunctions";
import { useSelector } from "react-redux";

export function CommentsCount({ descendants, linkDisabled=false, clsName='' }) {

    const { dark, modern } = useSelector(state => state.theme);

    if (linkDisabled) return (
        <p className={themedClass('no-comments', dark, modern)}>
            no comments
        </p>
    );

    const commentsCount = descendants => {
        if (descendants > 0) {
            if (descendants === 1) return `1 comment`;
            return `${descendants} comments`
        }
        return 'no comments';
    }

    return (
        <p className={clsName}>
            {commentsCount(descendants)}
        </p>
    );
}

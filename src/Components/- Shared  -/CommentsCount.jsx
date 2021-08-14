import { themedClass } from "../../Utilities/helperFunctions";

export function CommentsCount({ descendants, dark, modern }) {

    if (descendants < 1 || !descendants) return (
        <p className={themedClass('no-comments', dark, modern)}>
            no comments
        </p>
    );

    return (
        <p>
            {`${descendants} comment${descendants > 1 ? 's' : ''}`}
        </p>
    );
}

export function CommentsCount({ descendants, darkTheme }) {

    if (descendants < 1 || !descendants) return (
        <p className={`no-comments`}>
            no comments
        </p>
    );

    return (
        <p className={`comments-exist`}>
            {`${descendants} comment${descendants > 1 ? 's' : ''}`}
        </p>
    );
}

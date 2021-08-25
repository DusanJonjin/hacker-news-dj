import { themedClass } from "../../Utilities/helperFunctions";

export function Title({ storyUrl, title, dark }) {

    if (!title) return <div className={themedClass('fake-title', dark)}></div>

    return (
        <h2>
            <a 
                href={storyUrl} 
                target='_blank' 
                rel='noopener noreferrer'
                className={themedClass('title-link', dark)}
            >
            {title}
            </a>
        </h2>
    );
}

export function Title({ storyUrl, title }) {

    return (
        <h2>
            <a 
                href={storyUrl} 
                target='_blank' 
                rel='noopener noreferrer'
                className={`title-link`}
            >
            {title}
            </a>
        </h2>
    );
}

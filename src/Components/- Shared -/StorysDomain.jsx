import { themedClass } from "../../Utilities/helperFunctions";

export function StorysDomain({ domain, dark, modern }) {

    const displayDomain = modern ? domain : `(${domain})`;

    return (
        <p className={themedClass('domain', dark, modern)}>
            {displayDomain}
        </p>
    );
}

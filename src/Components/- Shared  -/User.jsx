export function User({ user, byWord='' }) {

    return (
        <p>
           {byWord} {user}
        </p>
    );
}

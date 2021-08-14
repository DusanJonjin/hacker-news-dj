import { Header } from './Components/Header/Header';
import { Stories } from './Components/Stories/Stories';
import { Comments } from './Components/Comments/Comments';
import { pathsAndApis } from './Utilities/paths&apisData';
import { Switch, Route, Redirect } from 'react-router-dom';
import { themedClass } from './Utilities/helperFunctions';
import { useSelector } from 'react-redux';
import './Styles/HackerNewsApp.css';

export function HackerNewsApp() {

    const { dark } = useSelector(state => state.theme);

    const storiesRoutes = pathsAndApis.reduce((acc, { path, api }, i) => 
    !path.includes('comments') ?
        [
            ...acc,
            <Route key={i} path={path}>
                <Stories 
                    storiesApiName={api}
                />
            </Route>
        ]
        : acc
    , []);

    return (
        <div className={themedClass('app-wrapper', dark)}>
            <Header />
            <main>
                <Switch>
                    <Redirect exact from='/' to='/top' />
                    {storiesRoutes}
                    <Route>
                        <Comments />
                    </Route>
                    <Route>
                        <p className='url-no-match'>
                            No match for this URL!
                        </p>
                    </Route>
                </Switch>
            </main>
            <footer className={themedClass('app-footer', dark)}>
                © {new Date().getFullYear()}. Hacker News App by D.J.
            </footer>      
        </div>
    )
}
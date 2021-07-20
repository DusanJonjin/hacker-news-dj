import { Header } from './Components/Header/Header';
import { Stories } from './Components/Stories/Stories';
import { Comments } from './Components/Comments/Comments';
import { pathsAndApis } from './Utilities/paths&apisData';
import { Switch, Route, Redirect } from 'react-router-dom';
import './Styles/HackerNewsApp.css';

export function HackerNewsApp() {

    const storiesRoutes = pathsAndApis.reduce((acc, obj, i) => 
    !obj.path.includes('comments') ?
        [
            ...acc,
            <Route key={i} path={obj.path}>
                <Stories 
                    storiesApiName={obj.api}
                />
            </Route>
        ]
        : acc
    , []);

    return (
        <div className={`app-wrapper`}>
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
            <footer className={`app-footer`}>
                © {new Date().getFullYear()}. Hacker News App by D.J.
            </footer>      
        </div>
    )
}
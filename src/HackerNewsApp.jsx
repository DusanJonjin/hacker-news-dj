import { Header } from './Components/Header/Header';
import { Stories } from './Components/Stories/Stories';
import { Comments } from './Components/Comments/Comments';
import { pathsAndApis } from './Utilities/paths&apisData';
import { Switch, Route, Redirect } from 'react-router-dom';
import { themedClass } from './Utilities/helperFunctions';
import { useScrollToTop } from './Hooks/ScrollToTop';
import { useSelector } from 'react-redux';
import './Styles/HackerNewsApp.css';

export function HackerNewsApp() {

    const { dark } = useSelector(state => state.theme);

    /* Make an Route array of Stories components only. This way the component unmounts
    every time the Route is changed. If we simply put the same component within Route
    (with different paths - which recieves different props) inside Switch, that 
    component will not unmount on Route change between them, it will always be mounted: */
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

    useScrollToTop();

    return (
        <div className={themedClass('app-wrapper', dark)}>
            <Header />
            <main>
                <Switch>
                    <Redirect exact from='/' to='/top' />
                    {storiesRoutes}
                    <Route path='/comments'>
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
                © {new Date().getFullYear()}. Hackr News App by D.J.
            </footer>      
        </div>
    )
}
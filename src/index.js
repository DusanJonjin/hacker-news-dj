import React from 'react';
import ReactDOM from 'react-dom';
import HackerNewsApp from './HackerNewsApp';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducers } from './Store/reducers';
import { BrowserRouter as Router } from 'react-router-dom';
//import reportWebVitals from './reportWebVitals';

const store = createStore(
    reducers, /*preload state */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Provider store={store}>
                <HackerNewsApp />
            </Provider> 
        </Router>
    </React.StrictMode>,
     document.getElementById('root')
);

//reportWebVitals();

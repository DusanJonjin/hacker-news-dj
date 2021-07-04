import React from 'react';
import { Header } from './Components/Header/Header';
import { Stories } from './Components/Stories/Stories';
import { Comments } from './Components/Comments/Comments';
import { pathsAndApis } from './Utilities/paths&apisData';

export function HackerNewsApp() {

    return (
        <div className={`app-wrapper`}>
            <Header />
            <main>
                <Stories />
                <Comments />
            </main>
            <footer className={`app-footer`}>
                © {new Date().getFullYear()}. Hacker News App by D.J.
            </footer>      
        </div>
    )
}
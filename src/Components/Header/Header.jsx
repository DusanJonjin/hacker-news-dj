import { useState } from 'react';
import { Navbar } from './Navbar';
import '../../Styles/Header/Header.css';

export function Header() {

    const [sideMenuOpen, setSideMenuOpen] = useState(false);

    const handleSideMenuOpen = () => {
        setSideMenuOpen(prevSideMenuOpen => !prevSideMenuOpen);
    }

    const closeSideMenu = () => {
        setSideMenuOpen(false);
    }

    return (
        <header className={`app-header`}>
            <div id='logo-wrapper'>
                <img src={require('../../Images/hn-logo.png').default}
                     alt='hacker-news-custom-logo'
                />
                <h3>Hacker News App</h3>
            </div>
            <Navbar sideMenuOpen={sideMenuOpen}
                    closeSideMenu={closeSideMenu}
            />
            <div className='theme-toggle-wrap' >
                <div className={`theme-toggle-bar `}
                >                 
                </div>
            </div>
            <div className='hamburger-wrap' onClick={() => handleSideMenuOpen()}>
                <div className={`hamburger ${sideMenuOpen ? 'menu-open' : ''}`}></div>
            </div>
        </header>
    )
}

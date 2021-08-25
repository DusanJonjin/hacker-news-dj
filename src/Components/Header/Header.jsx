import { useState } from 'react';
import { Navbar } from './Navbar';
import { ThemesBar } from './ThemesBar';
import { useSelector } from 'react-redux';
import { themedClass } from '../../Utilities/helperFunctions';
import '../../Styles/Header/Header.css';

export function Header() {

    const { dark, modern } = useSelector(state => state.theme);

    const [sideMenu, setSideMenu] = useState(false);

    const toggleSideMenu = () => {
        setSideMenu(prevSideMenu => !prevSideMenu);
    }

    const closeSideMenu = () => {
        setSideMenu(false);
    }

    return (
        <header className={themedClass('app-header', dark)}>
            <div id='logo-wrapper'>
                <img src={require('../../Images/hn-logo.png').default}
                     alt='hacker-news-custom-logo'
                />
                <h3>Hackr News App</h3>
            </div>
            <Navbar 
                sideMenu={sideMenu}
                closeSideMenu={closeSideMenu}
                dark={dark}
            />
            <ThemesBar 
                sideMenu={sideMenu} 
                dark={dark} 
                modern={modern}
            />
            <div className='hamburger-wrap' onClick={() => toggleSideMenu()}>
                <div className={`${themedClass('hamburger', dark)} ${sideMenu ? 'hamb-open' : ''}`}></div>
            </div>
        </header>
    )
}

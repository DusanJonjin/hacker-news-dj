import React from 'react'
import { pathsAndApis } from '../../Utilities/paths&apisData';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { themedClass } from '../../Utilities/helperFunctions';
import '../../Styles/Header/Navbar.css';

export function Navbar({ sideMenu, closeSideMenu, dark }) {

    const { pathname } = useLocation();

    const navLinks = pathsAndApis.map(({ path }, i) => {
        const selected = pathname.includes(path) ? 'selected-nav-li' : ''
        return (
            <li 
                key={i}
                className={`${themedClass('nav-li', dark)} ${selected}`} 
                onClick={() => closeSideMenu()}
            >
                <Link 
                    to={{pathname: path}}
                    className={themedClass('nav-link', dark)}
                >
                    {path.slice(1, path.length)}
                </Link>
            </li>
        )
    });

    return (
        <nav 
            className={`${themedClass('navbar', dark)} ${sideMenu ? 'navbar-open' : ''}`}
        >
            <ul>
                {navLinks}
            </ul>
        </nav>
    );
}



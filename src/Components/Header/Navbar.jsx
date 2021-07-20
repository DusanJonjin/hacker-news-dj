import { pathsAndApis } from '../../Utilities/paths&apisData';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../../Styles/Header/Navbar.css';

export function Navbar({ sideMenuOpen, closeSideMenu }) {

    const { pathname } = useLocation();

    const navLinks = pathsAndApis.map((obj, i) => 
        <li 
            key={i}
            className={`nav-li ${pathname.includes(obj.path) ? 'selected-link' : ''}`} 
            onClick={() => closeSideMenu()}
        >
            <Link 
                to={{pathname: obj.path}}
                className='nav-link'
            >
                {obj.path.slice(1, obj.path.length)}
            </Link>
        </li>
    );

    return (
        <nav 
            className={`navbar ${sideMenuOpen ? 'nav-side-open' : ''}`}
        >
            <ul>
                {navLinks}
            </ul>
        </nav>
    )
}

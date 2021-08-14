import { useDispatch } from 'react-redux';
import { selectModernTheme, selectClassicTheme, toggleDarkTheme } from '../../Store/actions';
import { themedClass } from '../../Utilities/helperFunctions';
import '../../Styles/Header/ThemesBar.css';

export function ThemesBar({ sideMenu, dark, modern }) {

    const dispatch = useDispatch();

    return (
        <div className={`theme-selection-wrap ${sideMenu && 'theme-sel-open'}`}>
            <button 
                className={`btn ${!modern && 'btn-selected'}`}
                onClick={() => dispatch(selectClassicTheme())}
            >
                Classic
            </button>
            <button 
                className={`btn ${modern && 'btn-selected'}`}
                onClick={() => dispatch(selectModernTheme())}
            >
                Modern
            </button>
            <div 
                className={themedClass('theme-dark-bar', dark)}
                onClick={() => dispatch(toggleDarkTheme())}
            >               
            </div>
        </div>
    )
}

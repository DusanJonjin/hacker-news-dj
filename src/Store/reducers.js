import { combineReducers } from 'redux';

const themeReducer = (state={dark: false, modern: false}, action) => {
    switch (action.type) {
        case 'TOGGLE_DARK_THEME': 
            const changedDarkTheme = {...state, dark: !state.dark};
            return changedDarkTheme;
        case 'SELECT_MODERN_THEME': 
            const modernThemeSelected = {...state, modern: true};
            return modernThemeSelected;
        case 'SELECT_CLASSIC_THEME':
            const classicThemeSelected = {...state, modern: false};
            return classicThemeSelected;
        default: return state;
    }
}


export const reducers = combineReducers(
    {
        theme: themeReducer
    }
);
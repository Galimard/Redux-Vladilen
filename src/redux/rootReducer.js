import { combineReducers } from "@reduxjs/toolkit";
import { DECREMENT, INCREMENT, CHANGE_THEME } from "./types";

function counterReducer(state = 0, action) {
    if (action.type === INCREMENT) {
        return state + 1;
    } else if (action.type === DECREMENT) {
        return state - 1;
    } 

    return state;
}

const initialStateTheme = {
    value: 'light'
}

function themeReducer(state = initialStateTheme, action) {
    switch (action.type) {
        case CHANGE_THEME:
            return {...state, value: action.payload} //редюсер не мутирует прошлое состояние, а возвращает новый объект
        default: return state;
    }
}

export const rootReducer = combineReducers({
    counter: counterReducer,
    theme: themeReducer
});
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'; //выводит данные в консоль
import { decrement, increment, asyncIncrement, changeTheme } from './redux/actions';
import { rootReducer } from './redux/rootReducer';
import './styles.css';

const counter = document.getElementById('counter');
const addBtn = document.getElementById('add');
const subBtn = document.getElementById('sub');
const asyncBtn = document.getElementById('async');
const themeBtn = document.getElementById('theme');

//пример middleware
// function logger(state) {
//     return function(next) {
//         return function(action) {
//             console.log('prev state', state.getState());
//             console.log('action', action);
//             const newState = next(action);
//             console.log('next state', state.getState());
//             return newState;
//         }
//     }
// }

const store = createStore(//д.б. объектом; асинхронный вариант
    rootReducer, 
    applyMiddleware(thunk, logger)
    ); 
// const store = createStore(rootReducer, 0); //д.б. объектом; синхронный вариант 

addBtn.addEventListener('click', () => {
    store.dispatch(increment());
});

subBtn.addEventListener('click', () => {
    store.dispatch(decrement());
});

asyncBtn.addEventListener('click', () => {
    store.dispatch(asyncIncrement());  
});

themeBtn.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('light') ? 'dark' : 'light';
    store.dispatch(changeTheme(newTheme));
});

store.subscribe(() => {
    const state = store.getState();

    counter.textContent = state.counter;
    document.body.className = state.theme.value;

   [addBtn, subBtn, themeBtn, asyncBtn].forEach(btn => btn.disabled = state.theme.disabled); 
});

 //для начальной инициализации стейта, после подписки вызываем dispatch
store.dispatch({ type: 'INIT_APPLICATION'});
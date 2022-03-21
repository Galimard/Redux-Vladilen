import {createStore} from 'redux';
import { decrement, increment } from './redux/actions';
import { rootReducer } from './redux/rootReducer';
import './styles.css';

const counter = document.getElementById('counter');
const addBtn = document.getElementById('add');
const subBtn = document.getElementById('sub');
const asyncBtn = document.getElementById('async');
const themeBtn = document.getElementById('theme');

const store = createStore(rootReducer, 0); //д.б. объектом

addBtn.addEventListener('click', () => {
    store.dispatch(increment());
});

subBtn.addEventListener('click', () => {
    store.dispatch(decrement());
});

store.subscribe(() => {
    const state = store.getState();

    counter.textContent = state;
});

 //для начальной инициализации стейта, после подписки вызываем dispatch
store.dispatch({ type: 'INIT_APPLICATION'});

asyncBtn.addEventListener('click', () => {
    setTimeout(() => {
        
    }, 2000);    
});

themeBtn.addEventListener('click', () => {
    // document.body.classList.toggle('dark');  
});
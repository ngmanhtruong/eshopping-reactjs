import { createStore, combineReducers, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';


//Slices
import { cartsReducer } from './features/carts/cartsSlice';
import { favoritesReducer } from './features/favorites/favoritesSlice';
import { productsReducer } from './features/products/productsSlice';

//all reducers
const reducers = {
    carts: cartsReducer,
    favorites: favoritesReducer,
    products: productsReducer
}

//store to sessionStorage
function saveToSessionStorage(state){
    try{    
        const fakeAPIStore = JSON.stringify(state);
        sessionStorage.setItem('fakeAPIStoreState',fakeAPIStore);
    } catch (e){
        console.warn(e);
    }
}

function loadFromSessionStorage(){
    try{
        const fakeAPIStoreState = sessionStorage.getItem('fakeAPIStoreState');
        if (fakeAPIStoreState === null) return undefined;
        return JSON.parse(fakeAPIStoreState);
    } catch (e){
        console.warn(e);
        return undefined;
    }
}

const myMiddleware = store => next => action => {
    console.log('Action', action);
    return next(action);
}

//declare store
export const store = createStore(
    combineReducers(reducers), 
    loadFromSessionStorage(), 
    applyMiddleware(thunk)
);

store.subscribe(()=>{
    saveToSessionStorage(store.getState());
})
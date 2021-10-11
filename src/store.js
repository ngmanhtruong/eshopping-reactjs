import { createStore, combineReducers } from 'redux';

//Slices
import { cartsReducer } from './features/carts/cartsSlice';
import { favoritesReducer } from './features/favorites/favoritesSlice';

//all reducers
const reducers = {
    carts: cartsReducer,
    favorites: favoritesReducer
}

//declare store
export const store = createStore(combineReducers(reducers));
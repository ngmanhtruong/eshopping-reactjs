import { isPersistedState } from "../../helpers";
const initialState = [];
const sessionState = isPersistedState('storeAPI');

export const productsReducer = (products = initialState, action) => {
    switch(action.type) {
        case 'products/loadData':
            return action.payload;
        case 'products/filterByPrice': {
            if(action.payload == 'PRICE_ASC')
                return products.slice().sort((a,b)=> a.price - b.price);
            if(action.payload == 'PRICE_DES')
                return products.slice().sort((b,a)=> b.price - a.price);
        }
        case 'products/filterByName': {
            if(action.payload == 'NAME_ASC')
                return products.slice().sort((a,b)=>a.title.localeCompare(b.title));
            if(action.payload == 'NAME_DES')
                return products.slice().sort((a,b)=>b.title.localeCompare(a.title));
        }
        default:
            return products;
    }
}

export const loadData = async () => {
    if (sessionState && sessionState.length > 0){
        return {
            type: 'products/loadData',
            payload: sessionState
        }
    }
    else {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        sessionStorage.setItem('storeAPI',JSON.stringify(data));
        return {
            type: 'products/loadData',
            payload: data
        }
    }
}

export const selectProducts = state => state.products;
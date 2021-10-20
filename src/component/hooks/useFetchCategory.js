import { useState, useEffect } from "react";

//API
import API from '../../API';

//Helper
import { isPersistedState } from '../../helpers';

const initialState = [];

export const useFetchCategory = category => {
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [filter, setFilter] = useState('');

    const fetchCategory = async (category) => {
        try{
            setError(false);
            setLoading(true);

            const products = await API.fetchCategory(category);

            setState(products);
        }
        catch (error) {
            setError(true);
        }
        setLoading(false);
    }

    const sort = () => {
        if(state){
            switch(filter){
                case 'PRICE-ASC':{
                    return state.sort((a,b)=> a.price - b.price);
                }
                case 'PRICE-DES':{
                    return state.sort((a,b)=> b.price - a.price);
                }
                case 'NAME-ASC': {
                    return state.sort((a,b)=>a.title.localeCompare(b.title));
                }
                case 'NAME-DES': {
                    return state.sort((a,b)=>b.title.localeCompare(a.title));
                }
                default: 
                    return state;
            }
        }
    }

    //Initial
    useEffect(()=>{
        if (category !== undefined){
            const sessionState = isPersistedState(`productsIn${category}`);

            if (sessionState && sessionState.length > 0){
                setLoading(true);
                setState(sessionState);
                setLoading(false);
                return;
            }
    
            fetchCategory(category);
        }

    },[category])

    //on Filter
    useEffect(()=>{
        if(filter !== '')
            setState(sort());
    },[filter]);

    //Write to sessionStorage
    useEffect(()=>{
        if(category !== undefined)
            sessionStorage.setItem(`productsIn${category}`,JSON.stringify(state));
    },[state]);

    return { state, loading, error, setFilter };
}


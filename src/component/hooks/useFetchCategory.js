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

    useEffect(()=>{
        const fetchCategory = async (category) => {
            try{
                setError(false);
                setLoading(true);
    
                const products = await API.fetchCategory(category);
    
                setState(products);
                setLoading(false);
            }
            catch (error) {
                setError(true);
            }
        }

        const sessionState = isPersistedState(`productsIn${category}`);

        if (sessionState && sessionState.length > 0){
            setLoading(true);
            setState(sessionState);
            setLoading(false);
            return;
        }

        fetchCategory(category);

    },[category])


    //Initial
    useEffect(()=>{

    },[category])

    //Write to sessionStorage
    useEffect(()=>{
        sessionStorage.setItem(`productsIn${category}`,JSON.stringify(state));
    },[state]);

    return { state, loading, error };
}


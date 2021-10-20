import { useState, useEffect } from "react";

//API
import API from '../../API';

//Helper
import { isPersistedState } from '../../helpers';

const initialState = [];

export const useFetchProducts = () => {
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchProducts = async () => {
        try{
            setError(false);
            setLoading(true);

            const products = await API.fetchProducts();

            setState(products);
        }
        catch (error) {
            setError(true);
        }
        setLoading(false);
    }

    //Initial
    useEffect(()=>{
        const sessionState = isPersistedState('allProducts');

        if (sessionState && sessionState.length > 0){
            setLoading(true);
            setState(sessionState);
            setLoading(false);
            return;
        }

        fetchProducts();
    },[]);

    //Write to sessionStorage
    useEffect(()=>{
        sessionStorage.setItem('allProducts',JSON.stringify(state));
    },[state]);



    return { state, loading, error };
}


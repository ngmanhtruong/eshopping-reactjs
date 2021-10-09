import { useState, useEffect } from "react";

//API
import API from '../../API';

//Helper
import { isPersistedState } from '../../helpers';

const initialState = [];

export const useFetchCategories = () => {
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchCategories = async () => {
        try{
            setError(false);
            setLoading(true);

            const products = await API.fetchCategories();

            setState(products);
        }
        catch (error) {
            setError(true);
        }
        setLoading(false);
    }

    //Initial
    useEffect(()=>{
        const sessionState = isPersistedState('allCategories');

        if (sessionState && sessionState.length > 0){
            setLoading(true);
            setState(sessionState);
            setLoading(false);
            return;
        }

        fetchCategories();
    },[])

    //Write to sessionStorage
    useEffect(()=>{
        sessionStorage.setItem('allCategories',JSON.stringify(state));
    },[state]);

    return { state, loading, error };
}


const initialState = [];

export const favoritesReducer = (favorites = initialState, action) => {
    switch(action.type) {
        case 'favorites/addFavorite': {
            let check = false;
            favorites.map(item=>{
                if(item.id === action.payload.id){
                    check = true;
                    return;
                }
            })
            if (!check){
                let favorite = {
                    id: action.payload.id,
                    name: action.payload.title,
                    image: action.payload.image,
                    price: action.payload.price
                }
                return [...favorites, favorite]
            }
        }
        case 'favorites/removeFromFavorites': {
            return favorites.filter(item => item.id !== action.payload)
        }
        case 'favorites/removeAll': {
            return initialState;
        }
        default:
            return favorites;
    }
}

export function addFavorite(item){
    return{
        type: 'favorites/addFavorite',
        payload: item
    }
}

export const removeFromFavorites = (index) => {
    return{
        type: 'favorites/removeFromFavorites',
        payload: index
    }
}

export const removeAllFavorites = () =>{
    return{
        type: 'favorites/removeAll'
    }
}

//implement selectors
export const selectFavorites = state => state.favorites;

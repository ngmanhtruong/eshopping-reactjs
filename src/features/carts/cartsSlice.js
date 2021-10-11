const initialState = {
    numberInCart: 0,
    carts: []
};

export const loadData = () => {
    return {
        type: 'cart/loadData'
    }
}

export const cartsReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'cart/loadData': {
            return state;
        }
        case 'cart/addCart': {
            if (state.numberInCart === 0){
                let cart = {
                    id: action.payload.id,
                    quantity: 1,
                    name: action.payload.title,
                    image: action.payload.image,
                    price: action.payload.price,
                    description: action.payload.description
                }
                return {
                    ...state,
                    carts: [...state.carts, cart]
                }
            }
            else {
                let check = false;
                state.carts.map(item => {
                    if (item.id === action.payload.id){
                        item.quantity++;
                        check = true;
                        return;
                    }
                })
                if(!check){
                    let cart = {
                        id: action.payload.id,
                        quantity: 1,
                        name: action.payload.title,
                        image: action.payload.image,
                        price: action.payload.price,
                        description: action.payload.description
                    }
                    return {
                        ...state,
                        carts: [...state.carts, cart]
                    }
                }
            }
            return {
                ...state,
                numberInCart: state.numberInCart + 1
            }
        }
        case 'cart/decreseCart': {
            let quantity = state.carts[action.payload].quantity;
            if (quantity > 1){
                state.numberInCart--;
                state.carts[action.payload].quantity--;
            }
            if (quantity === 1){
                state.numberInCart--;
                return {
                    ...state,
                    carts: state.carts.filter(item=>item.id !== state.carts[action.payload].id)
                }
            }
        }
        case 'cart/removeFromCart': {
            let quantity = state.carts[action.payload].quantity;
            return {
                ...state,
                numberInCart: state.numberInCart - quantity,
                carts: state.carts.filter(item => item.id !== state.carts[action.payload].id)
            }
        }
        case 'cart/removeAll': {
            return initialState;
        }
        default:
            return state;
    }
}

export function addCart(item){
    return{
        type: 'cart/addCart',
        payload: item
    }
}

export function decreaseCart(index){
    return{
        type: 'cart/decreaseCart',
        payload: index
    }
}

export const removeFromCart = (index) => {
    return{
        type: 'cart/removeFromCart',
        payload: index
    }
}

export const removeAll = () =>{
    return{
        type: 'cart/removeAll'
    }
}

//implement selectors
export const selectCarts = state => state.carts;

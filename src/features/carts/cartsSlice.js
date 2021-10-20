const initialState = {
    numberInCart: 0,
    total: 0,
    Carts: []
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
            if (state.numberInCart == 0){
                let cart = {
                    id: action.payload.id,
                    quantity: 1,
                    name: action.payload.title,
                    image: action.payload.image,
                    price: action.payload.price,
                    description: action.payload.description
                }
                state.Carts.push(cart);
            }
            else {
                let check = false;
                state.Carts.map((item, index) => {
                    if (item.id == action.payload.id){
                        state.Carts[index].quantity++;
                        check = true;
                        return;
                    }
                })
                if(!check){
                    let _cart = {
                        id: action.payload.id,
                        quantity: 1,
                        name: action.payload.title,
                        image: action.payload.image,
                        price: action.payload.price,
                        description: action.payload.description
                    }
                    state.Carts.push(_cart);
                }
            }
            return {
                ...state,
                numberInCart: state.numberInCart + 1,
                total: state.total + action.payload.price
            }
        }
        case 'cart/decreaseCart': {
            let quantity = state.Carts[action.payload].quantity;
            if (quantity > 1){
                state.numberInCart--;
                state.Carts[action.payload].quantity--;
                state.total -= state.Carts[action.payload].price;
            }
            return {
                ...state
            }
        }
        case 'cart/removeFromCart': {
            let quantity = state.Carts[action.payload].quantity;
            return {
                ...state,
                numberInCart: state.numberInCart - quantity,
                total: state.total - (state.Carts[action.payload].quantity * state.Carts[action.payload].price),
                Carts: state.Carts.filter(item => item.id != state.Carts[action.payload].id)
            }
        }
        case 'cart/removeAll': {
            return initialState;
        }
        default:
            return state;
    }
}

export function addCart(payload){
    return{
        type: 'cart/addCart',
        payload
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

const initialState = [];

export const usersReducer = (users = initialState, action) => {
    switch(action.type){
        case 'users/addUser': {
            
        }
        default:
            return users;
    }
}

let userData = localStorage.getItem('userData');
export const initialState = {
    user: JSON.parse(userData) ? JSON.parse(userData) : null
};

export const actionTypes = {
    SET_USER: "SET_USER",
    UNSET_USER: "UNSET_USER"
};

const reducer = (state, action) => {
    switch(action.type){
        case actionTypes.SET_USER:
            return{
                ...state,
                user: action.user
            };
        
        case actionTypes.UNSET_USER:
            return{
                ...state,
                user: action.user
            };
        
        default:
            return state;
    }
};

export default reducer;
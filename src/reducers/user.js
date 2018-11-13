import User from "../classes/User";

const defaultState = new User();

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case 'LOGIN':
            console.log('[REDUX] User login signal recieved in reducer ', action.userData);
            break;
        case 'LOGOUT':
            console.log('[REDUX] User logout signal recieved in reducer.');
            break;
        default:
            return state;
    }
    return state;
}
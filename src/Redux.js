import {createStore} from 'redux'
import produce from "immer"

import User from 'classes/User'


const defaultStore = {
    user: new User()
};

function userReducer(store = defaultStore, action) {
    switch (action.type) {
        case 'LOGIN':


        default:
            return store;
    }
}
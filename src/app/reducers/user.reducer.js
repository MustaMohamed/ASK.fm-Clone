
import {userConstants} from '../constants/index';

const initialState = {
};

export function user(state = initialState, action) {
    switch (action.type) {
        case userConstants.USER_SIGNUP_SUCCESS:
            return {...state, ...action.user};
        case userConstants.USER_SIGNUP_FAIL:
            return { ...state, ...action.user, error: action.error};
        case userConstants.USER_LOGOUT:
            return {};
        default:
            return state;
    }
}
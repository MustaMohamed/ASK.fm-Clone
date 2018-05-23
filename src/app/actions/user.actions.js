

/*

select the logic to do with services adn then go to reducer to update the state

*/

import { userConstants } from '../constants/index';
import { userServices } from '../services/index';

export const userActions = {
    Register: (userData) => {
        return (dispatch) => {
            let userResponse = userServices.UserSignup(userData);
            userResponse.then((response) => {
                dispatch( { type: userConstants.USER_SIGNUP_SUCCESS ,user: { ...userData, key: response.key }});
            }).catch((err) => {
                dispatch({ type: userConstants.USER_SIGNUP_FAIL, user: null, error: err });
            }); 
        };
    }
};
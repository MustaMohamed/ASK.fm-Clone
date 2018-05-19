

export const userActions = {
    Register: (userData) => {
        return (dispatch) => {
            dispatch({ type: 'USER_REGISTER', user: userData});
        };
    }
};
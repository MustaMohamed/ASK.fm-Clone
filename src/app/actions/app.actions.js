
export const appActions = {
    AppSaysHello: () => {
        return (dispatch) => {
            dispatch({type: 'SAY_HELLO', message: 'Hello From redux state'});
        };
    }
};

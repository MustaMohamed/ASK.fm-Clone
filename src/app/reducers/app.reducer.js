
const initialState = {
    message: 'Hello'
};

export function app(state = initialState, action) {
    switch (action.type) {
        case 'SAY_HELLO':
            return {
                ...state,
                message: action.message
            };
        default:
            return state;
    }
}
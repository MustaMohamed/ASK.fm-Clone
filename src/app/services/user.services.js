
import database from '../utils/database/firebase.db';
export const userServices = {
    UserSignup: (userData) => {
        let users = database.ref('users/');
        return users.push({ ...userData });
    },
};
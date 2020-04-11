import { recipeConstants } from '../utils/constants';
import { api } from '../utils/api';

export const authActions = {
    login,
    logout
};

function login(user, tokenId) {
    return dispatch => {

        api.post('/login', { tokenId: tokenId })
            .then(
                res => {
                    const data = {
                        loggedIn: true,
                        user: {
                            ...user,
                            _id: res.data._id,
                        },
                        token: res.data.token,
                    }

                    localStorage.setItem('auth', JSON.stringify(data));
                    dispatch({ type: recipeConstants.AUTH_LOGIN, data: data });
                },
                error => {
                    dispatch({ type: recipeConstants.SHOW_SNACKBAR, data: error.toString() });
                }
            )
    }
}

function logout() {
    localStorage.removeItem('auth');
    return { type: recipeConstants.AUTH_LOGOUT };
}

import { recipeConstants } from '../utils/constants';
import { api } from '../utils/api';

export const recipeActions = {
    getRecipeList,
    getRecipeDetail,
    filterRecipeList,
    selectSorting,
    editCurrentRecipe,
    updateRecipe,
    deleteRecipe,
    addRecipe,
    getProfileRecipeList,
    getLikedRecipeList,
    likeRecipe,
    unlikeRecipe,
    likeCurrentRecipe,
    unlikeCurrentRecipe,
};

function getRecipeList() {
    return dispatch => {
        dispatch({ type: recipeConstants.GET_RECIPE_LIST_REQUEST });

        api.get('/recipes')
            .then(
                response => {
                    dispatch({ type: recipeConstants.GET_RECIPE_LIST_SUCCESS, data: response.data });
                })
            .catch(
                error => {
                    dispatch({ type: recipeConstants.GET_RECIPE_LIST_ERROR, error: error, snackbar: "Unable to fetch data." });
                }
            )
    };
}

function getRecipeDetail(recipeId) {
    return dispatch => {
        dispatch({ type: recipeConstants.GET_RECIPE_DETAIL_REQUEST });

        api.get(`/recipes/${recipeId}`)
            .then(
                response => {
                    dispatch({ type: recipeConstants.GET_RECIPE_DETAIL_SUCCESS, data: response.data });
                })
            .catch(
                error => {
                    dispatch({ type: recipeConstants.GET_RECIPE_DETAIL_ERROR, error: error, snackbar: "Unable to fetch data." });
                }
            )
    };
}

function deleteRecipe(pk, callback) {
    return dispatch => {
        dispatch({ type: recipeConstants.DELETE_RECIPE_REQUEST });

        const auth = JSON.parse(localStorage.getItem('auth'));
        if (!auth) {
            dispatch({ type: recipeConstants.DELETE_RECIPE_ERROR, data: 'Not authorized' });
        }

        api.delete(`/recipes/${pk}/`, { 'headers': { 'Authorization': auth.token } })
            .then(
                _ => {
                    dispatch({ type: recipeConstants.DELETE_RECIPE_SUCCESS, data: { pk: pk }, snackbar: "Successfully deleted" });
                    callback();
                })
            .catch(
                error => {
                    dispatch({ type: recipeConstants.DELETE_RECIPE_ERROR, error: error });
                }
            )
    };
}

function updateRecipe(pk, data, callback) {
    return dispatch => {
        dispatch({ type: recipeConstants.UPDATE_RECIPE_REQUEST });
        const auth = JSON.parse(localStorage.getItem('auth'));
        if (!auth) {
            dispatch({ type: recipeConstants.UPDATE_RECIPE_ERROR, data: 'Not authorized' });
        }

        api.put(`/recipes/${pk}/`, data, { 'headers': { 'Authorization': auth.token } })
            .then(
                response => {
                    dispatch({ type: recipeConstants.UPDATE_RECIPE_SUCCESS, data: { recipe: response.data }, snackbar: "Successfully updated" });
                    callback();
                })
            .catch(
                error => {
                    dispatch({ type: recipeConstants.UPDATE_RECIPE_ERROR, error: error });
                }
            )
    };
}

function addRecipe(data) {
    return dispatch => {
        dispatch({ type: recipeConstants.ADD_RECIPE_REQUEST });
        const auth = JSON.parse(localStorage.getItem('auth'));
        if (!auth) {
            dispatch({ type: recipeConstants.ADD_RECIPE_ERROR, data: 'Not authorized' });
        }

        api.post(`/recipes/`, data, { 'headers': { 'Authorization': auth.token } })
            .then(
                response => {
                    dispatch({ type: recipeConstants.ADD_RECIPE_SUCCESS, data: response.data, snackbar: "Successfully created" });
                })
            .catch(
                error => {
                    dispatch({ type: recipeConstants.ADD_RECIPE_ERROR, error: error });
                }
            )
    };
}

function getProfileRecipeList() {
    return dispatch => {
        dispatch({ type: recipeConstants.GET_PROFILE_RECIPE_LIST_REQUEST });
        const auth = JSON.parse(localStorage.getItem('auth'));
        if (!auth) {
            dispatch({ type: recipeConstants.GET_PROFILE_RECIPE_LIST_ERROR, data: 'Not authorized' });
        }

        api.get('/profile/recipes', { 'headers': { 'Authorization': auth.token } })
            .then(
                response => {
                    dispatch({ type: recipeConstants.GET_PROFILE_RECIPE_LIST_SUCCESS, data: response.data });
                })
            .catch(
                error => {
                    dispatch({ type: recipeConstants.GET_PROFILE_RECIPE_LIST_ERROR, error: error, snackbar: "Unable to fetch data." });
                }
            )
    };
}

function getLikedRecipeList() {
    return dispatch => {
        dispatch({ type: recipeConstants.GET_LIKED_RECIPE_LIST_REQUEST });
        const auth = JSON.parse(localStorage.getItem('auth'));
        if (!auth) {
            dispatch({ type: recipeConstants.GET_LIKED_RECIPE_LIST_ERROR, data: 'Not authorized' });
        }

        api.get('/profile/liked', { 'headers': { 'Authorization': auth.token } })
            .then(
                response => {
                    dispatch({ type: recipeConstants.GET_LIKED_RECIPE_LIST_SUCCESS, data: response.data });
                })
            .catch(
                error => {
                    dispatch({ type: recipeConstants.GET_LIKED_RECIPE_LIST_ERROR, error: error, snackbar: "Unable to fetch data." });
                }
            )
    };
}


function likeRecipe(data, userId) {
    return dispatch => {
        dispatch({ type: recipeConstants.LIKE_RECIPE_REQUEST });
        const auth = JSON.parse(localStorage.getItem('auth'));
        if (!auth) {
            dispatch({ type: recipeConstants.LIKE_RECIPE_ERROR, data: 'Not authorized' });
        }

        api.post('/like', data, { 'headers': { 'Authorization': auth.token } })
            .then(
                _ => {
                    dispatch({ type: recipeConstants.LIKE_RECIPE_SUCCESS, data: { recipeId: data.recipeId, userId: userId }, snackbar: "Added recipe to Liked" });
                })
            .catch(
                error => {
                    dispatch({ type: recipeConstants.LIKE_RECIPE_ERROR, error: error });
                }
            )
    };
}

function unlikeRecipe(data, userId) {
    return dispatch => {
        dispatch({ type: recipeConstants.UNLIKE_RECIPE_REQUEST });
        const auth = JSON.parse(localStorage.getItem('auth'));
        if (!auth) {
            dispatch({ type: recipeConstants.UNLIKE_RECIPE_ERROR, data: 'Not authorized' });
        }

        api.post('/unlike', data, { 'headers': { 'Authorization': auth.token } })
            .then(
                _ => {
                    dispatch({ type: recipeConstants.UNLIKE_RECIPE_SUCCESS, data: { recipeId: data.recipeId, userId: userId }, snackbar: "Remove recipe from Liked" });
                })
            .catch(
                error => {
                    dispatch({ type: recipeConstants.UNLIKE_RECIPE_ERROR, error: error });
                }
            )
    };
}


function likeCurrentRecipe(data, userId) {
    return dispatch => {
        dispatch({ type: recipeConstants.LIKE_CURRENT_RECIPE_REQUEST });
        const auth = JSON.parse(localStorage.getItem('auth'));
        if (!auth) {
            dispatch({ type: recipeConstants.LIKE_RECIPE_ERROR, data: 'Not authorized' });
        }

        api.post('/like', data, { 'headers': { 'Authorization': auth.token } })
            .then(
                _ => {
                    dispatch({ type: recipeConstants.LIKE_CURRENT_RECIPE_SUCCESS, data: { recipeId: data.recipeId, userId: userId }, snackbar: "Added recipe to Liked" });
                })
            .catch(
                error => {
                    dispatch({ type: recipeConstants.LIKE_CURRENT_RECIPE_ERROR, error: error });
                }
            )
    };
}

function unlikeCurrentRecipe(data, userId) {
    return dispatch => {
        dispatch({ type: recipeConstants.UNLIKE_CURRENT_RECIPE_REQUEST });
        const auth = JSON.parse(localStorage.getItem('auth'));
        if (!auth) {
            dispatch({ type: recipeConstants.UNLIKE_CURRENT_RECIPE_ERROR, data: 'Not authorized' });
        }

        api.post('/unlike', data, { 'headers': { 'Authorization': auth.token } })
            .then(
                _ => {
                    dispatch({ type: recipeConstants.UNLIKE_CURRENT_RECIPE_SUCCESS, data: { recipeId: data.recipeId, userId: userId }, snackbar: "Remove recipe from Liked" });
                })
            .catch(
                error => {
                    dispatch({ type: recipeConstants.UNLIKE_CURRENT_RECIPE_ERROR, error: error });
                }
            )
    };
}




function filterRecipeList(words, category) {
    return { type: recipeConstants.FILTER_RECIPE_LIST, data: { words: words, category: category } };
}

function selectSorting(sorting) {
    localStorage.setItem("sorting", sorting);
    return { type: recipeConstants.SELECT_SORTING, data: sorting };
}

function editCurrentRecipe(recipe) {
    return { type: recipeConstants.EDIT_CURRENT_RECIPE, data: recipe };
}

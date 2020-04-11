import { recipeConstants } from '../utils/constants';

export const snackActions = {
    showSnackbar,
    hideSnackbar
};

function showSnackbar(message) {
    return { type: recipeConstants.SHOW_SNACKBAR, data: message };
}

function hideSnackbar() {
    return { type: recipeConstants.HIDE_SNACKBAR };
}

import { recipeConstants } from '../utils/constants'

const initialState = {
    open: false,
    message: "",
}

export function snackbar(state = initialState, action) {
    switch (action.type) {

        case recipeConstants.SHOW_SNACKBAR:
            return {
                ...state,
                open: true,
                message: action.data
            }

        case recipeConstants.HIDE_SNACKBAR:
            return {
                ...state,
                open: false,
                message: "",
            }

        default:
            if (action.snackbar) {
                return {
                    ...state,
                    open: true,
                    message: action.snackbar,
                }
            } else {
                return state
            }
    }
}
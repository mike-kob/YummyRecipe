import { recipeConstants } from '../utils/constants'

const initialState = {
  open: false,
  message: "",
  consent: false,
  onSuccess: undefined,
}

export function consent(state = initialState, action) {
  switch (action.type) {
    case recipeConstants.SHOW_CONSENT_DIALOG:
      return {
        ...state,
        open: true,
        message: action.data.message,
        onSuccess: action.data.onSuccess,
        consent: false,
      }

    case recipeConstants.HIDE_CONSENT_DIALOG:
      return {
        ...state,
        open: false,
        consent: action.data,
      }

    default:
      return state
  }
}
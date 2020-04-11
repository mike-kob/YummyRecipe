import { recipeConstants } from '../utils/constants'

const prev = localStorage.getItem('auth');

const initialState = {
  loggedIn: false,
  user: {},
  token: undefined,
  ...JSON.parse(prev)
}

export function auth(state = initialState, action) {
  switch (action.type) {
    case recipeConstants.AUTH_LOGIN:
      return {
        ...state,
        ...action.data,
      }

    case recipeConstants.AUTH_LOGOUT:
      return {
        loggedIn: false,
        user: {},
        token: undefined,
      }

    default:
      return state
  }
}
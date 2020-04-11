import { recipeConstants } from '../utils/constants'

const initialState = {
  profileRecipes: [],
  likedRecipes: [],
  currentRecipe: {
    "name": "",
    "category": [],
    "photo_url": "",
    "shortDesc": "",
    "longDesc": "",
    "createDate": ""
  }
}

export function profile(state = initialState, action) {
  switch (action.type) {
    case recipeConstants.GET_PROFILE_RECIPE_LIST_SUCCESS:
      return {
        ...state,
        profileRecipes: action.data
      }
    case recipeConstants.GET_LIKED_RECIPE_LIST_SUCCESS:
      return {
        ...state,
        likedRecipes: action.data
      }

    case recipeConstants.EDIT_CURRENT_RECIPE:
      return {
        ...state,
        currentRecipe: {
          ...state.currentRecipe,
          ...action.data
        }
      }
    case recipeConstants.DELETE_RECIPE_SUCCESS:
      return {
        ...state,
        recipes: state.profileRecipes.filter(recipe => recipe._id !== action.data.pk)
      }

    case recipeConstants.ADD_RECIPE_SUCCESS:
      return {
        ...state,
        profileRecipes: [
          ...state.recipes,
          action.data,
        ]
      }

    default:
      return state
  }
}
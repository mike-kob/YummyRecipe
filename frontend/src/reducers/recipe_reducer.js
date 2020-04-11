import { recipeConstants, sorting } from '../utils/constants'

const initialState = {
  recipes: [],
  categories: [],
  filterTerm: "",
  sorting: localStorage.getItem("sorting") || sorting.DATE_DESCENDING,
  filterCategory: "",
  message: "",
  currentRecipe: {
    "name": "",
    "category": [],
    "photo_url": "",
    "shortDesc": "",
    "longDesc": "",
    "createDate": "",
    "likedBy": [],
  }
}

export function recipes(state = initialState, action) {
  switch (action.type) {

    case recipeConstants.GET_RECIPE_LIST_SUCCESS:
      return {
        ...state,
        recipes: action.data
      }
    case recipeConstants.GET_RECIPE_DETAIL_SUCCESS:
      return {
        ...state,
        currentRecipe: action.data
      }

    case recipeConstants.GET_CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        categories: action.data
      }

    case recipeConstants.FILTER_RECIPE_LIST:
      return {
        ...state,
        filterTerm: action.data.words,
        filterCategory: action.data.category,
      }

    case recipeConstants.SELECT_SORTING:
      return {
        ...state,
        sorting: action.data
      }
    case recipeConstants.UPDATE_RECIPE_SUCCESS:
      return {
        ...state,
        recipes: [
          ...state.recipes.filter(obj => obj._id != action.data.recipe._id),
          action.data.recipe,
        ]
      }

    default:
      return state
  }
}
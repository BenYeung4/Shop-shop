import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "./actions";

//used to help initialize our global state object and then provide us with the functionality for updating the state by automatically running it through our custom reducer() function.
import { useReducer } from "react";

//this code imports the possible actions we can preform and creates a funcino called reducer() which is used in the reducers.test.js
export const reducer = (state, action) => {
  switch (action.type) {
    //if action type value is the value of `UPDATE_PRODUCTS`, return a new state object with an updated products array
    case UPDATE_PRODUCTS:
      return { ...state, products: [...action.products] };

    // if action type value is the value of `UPDATE_CATEGORIES`, return a new state object with an updated categories array
    case UPDATE_CATEGORIES:
      return { ...state, categories: [...action.categories] };

    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
      };

    //if its none of these actions, do not update state at all and keep things the same!
    default:
      return state;
  }
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}

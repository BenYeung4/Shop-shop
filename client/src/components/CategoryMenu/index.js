import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../../utils/queries";
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";

//to get the products in indexedBD
import { idbPromise } from "../../utils/helpers";

function CategoryMenu() {
  //useStoreContext() Hook to retrieve the current state form the global state object.  the dispatch() method to update state
  const [state, dispatch] = useStoreContext();

  //categories array out of our global state, simply destructe it out of state so we can use it to provie to our returning JSX
  const { categories } = state;

  //since we currently dont have data in state yet, we take the categoryData that returns from the useQuery() Hook and use the dispatch() method to set our cglobal state.  need to use useEffect() Hook
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  //useEffect() hook takes two arguments function to run given a certain condition and then the condition
  useEffect(() => {
    // if categoryData exists or has changed from the response of useQuery, then run dispatch()
    if (categoryData) {
      // execute our dispatch function with our action object indicating the type of action and the data to set our state for categories to
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      // but let's also take each categories and save it to IndexedDB using the helper function

      categoryData.categories.forEach((category) => {
        idbPromise("categories", "put", category);
      });
      // add else if to check if `loading` is undefined in `useQuery()` Hook, that is if we went offline
    } else if (!loading) {
      // since we're offline, get all of the data from the `categories` store

      idbPromise("categories", "get").then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;

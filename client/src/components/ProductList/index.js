//displays the product's list

import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";

import ProductItem from "../ProductItem";
import { QUERY_PRODUCTS } from "../../utils/queries";
import spinner from "../../assets/spinner.gif";

import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../../utils/actions";

//indexedDB data saving and retrivin funcationality
import { idbPromise } from "../../utils/helpers";

function ProductList() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  //useEffect() hook is used in order to wait for our useQuery() response to come in.  once the data object returned from useQuery() goes from undefined to having an actual value, we exectue our dispatch() function, instructing our reducer function that it's the UPDATE_PRODUCTS action and it should save the aray of product data to our global store.
  useEffect(() => {
    // if there's data to be stored
    if (data) {
      // let's store it in the global state object, saving to the products store in indexedDB, can check in devTools under application
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      // but let's also take each product and save it to IndexedDB using the helper function
      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });

      // add else if to check if `loading` is undefined in `useQuery()` Hook, that is if we went offline
    } else if (!loading) {
      // since we're offline, get all of the data from the `products` store
      idbPromise("products", "get").then((products) => {
        // use retrieved data to set global state for offline browsing
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(
      (product) => product.category._id === currentCategory
    );
  }

  //updated products.length to state.products.length because we are now retriving products from the state object
  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {state.products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;

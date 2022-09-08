import React, { useEffect } from "react";
import CartItem from "../CartItem";
import Auth from "../../utils/auth";
import "./style.css";

import { useStoreContext } from "../../utils/GlobalState";
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

const Cart = () => {
  // You'll use the custom useStoreContext Hook to establish a state variable and the dispatch() function to update the state. In this case, dispatch() will call the TOGGLE_CART action.
  const [state, dispatch] = useStoreContext();

  //this is used so when we exit the tab, we can see the items are stil in the cart, very important
  useEffect(() => {
    //checking to se if state.cart.length is 0, then execute getCart() to retrieve the items fro mthe art oject store an save it to th gloabl state object.
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      //displatch ADD_MULTIPLE_TO_CART action here because we have an array of items returning from IndexedDB, even if its just one product saved.  this way we can just dump all of the products into the global state obnject at once instead of doing it one by one.
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
    //checking to se if state.cart.length is 0
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  //adding up the item values, adds up everything from state.cart
  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  //setting the dispaly of the cart, If cartOpen is false, the component will return a much smaller <div>. Clicking this <div>, however, will set cartOpen to true and return the expanded shopping cart.
  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <span role="img" aria-label="trash">
          🛒
        </span>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="close" onClick={toggleCart}>
        [close]
      </div>
      <h2>Shopping Cart</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>
            {Auth.loggedIn() ? (
              <button>Checkout</button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>
        </div>
      ) : (
        <h3>
          <span role="img" aria-label="shocked">
            😱
          </span>
          You haven't added anything to your cart yet!
        </h3>
      )}
    </div>
  );
};

export default Cart;

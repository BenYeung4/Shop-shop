//React Context API, redux-like feature

//createContext will be used to instantiate a new context object.  using it to create the container to hold our global state data and functionality so we can provid it throughout the app
//useContext is another React Hook that will allow us to use th state created from the createCotnext function
import React, { createContext, useContext } from "react";
import { useProductReducer } from "./reducers";

//every context object comes with two components, a provider and consumer.  provider is a special type of react componet that we wrap our application in so it can make the state data thats pased inot it as a proper avialable to all other compnents.  Consumer is our means of grabbing and using thedata that th provider holds for us
const StoreContext = createContext();
const { Provider } = StoreContext;

//instantiate our initial global state with the useProductReducer() function we created earlier.  Because that wraps it aronud the useReducer() Hook from React, every time we run this useProductReducer() functio, we recieve the following two items in return.  State - is the most up-to-date version of our global state object.  dispatch - method we execute toupdate our state.
const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useProductReducer({
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: "",
  });

  //use this to confirm it works!
  console.log(state);
  return <Provider value={[state, dispatch]} {...props} />;
};

//custom react hook
const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };

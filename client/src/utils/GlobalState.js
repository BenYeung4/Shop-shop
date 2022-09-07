import React, { createContext, useContext } from "react";
import { useProductReducer } from "./reducers";

const StoreContext = createContext();
const { Provider } = StoreContext;

//instantiate our initial global state with the useProductReducer() function we created earlier.  Because that wraps it aronud the useReducer() Hook from React, every time we run this useProductReducer() functio, we recieve the following two items in return.  State - is the most up-to-date version of our global state object.  dispatch - method we execute toupdate our state.
const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useProductReducer({
    products: [],
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

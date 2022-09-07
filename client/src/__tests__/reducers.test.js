//purpose of reducers - function that updates state by returining a new state object and never alters the orginal state object.

//import from utils/reducers.js
import { reducer } from "../utils/reducers";

//original state
const state = {
  name: "Lernantino",
  email: "lernantino@gmail.com",
};

// create a new version of state by making a copy of the original state's data and updating only the part that has changed
const updatedState = { ...state, email: "lerntino99@gmail.com" };

//import our actions
import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "../utils/actions";

//create a sample of what our glboal state will look like
const initialState = {
  products: [],
  categories: [{ name: "Food" }],
  currentCategory: "1",
};

//newState object will be the result of wha comes from a functino that we haven't reated yet,
test("UPDATE_PRODUCTS", () => {
  let newState = reducer(initialState, {
    type: UPDATE_PRODUCTS,
    products: [{}, {}],
  });

  expect(newState.products.length).toBe(2);
  expect(initialState.products.length).toBe(0);
});

//Update_categories
test("UPDATE_CATEGORIES", () => {
  let newState = reducer(initialState, {
    type: UPDATE_CATEGORIES,
    categories: [{}, {}],
  });

  expect(newState.categories.length).toBe(2);
  expect(initialState.categories.length).toBe(1);
});

//update_current_category
//this test, update the state of currentCategory to a new string value instea of an rray.  When the test runs, compare these values beween newState and initialState to confirm that initialState haas remained the same
test("UPDATE_CURRENT_CATEGORY", () => {
  let newState = reducer(initialState, {
    type: UPDATE_CURRENT_CATEGORY,
    currentCategory: "2",
  });

  expect(newState.currentCategory).toBe("2");
  expect(initialState.currentCategory).toBe("1");
});

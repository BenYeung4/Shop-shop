//UPDATE_PRODUCTS - used by the ProductList component, retrieving everything from server and apollo catches
export const UPDATE_PRODUCTS = "UPDATE_PRODUCTS";
//works almost like update_product, we want to stake the list of categories retrieved from the server by Apollo and store it in this global state.
export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";
//connecting piece of data for the previous two actions.  we want to be able to select a category from the state created by the Update_categories action and display products for that category form the list
export const UPDATE_CURRENT_CATEGORY = "UPDATE_CURRENT_CATEGORY";

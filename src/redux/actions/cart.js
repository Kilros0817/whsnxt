import { 
    ADD_TO_CART,
    REMOVE_FROM_CART,
    SUB_QUANTITY,
    ADD_QUANTITY,
    EMPTY_CART
 } from "./type";

 export const addToCart = async (dispatch, data) => {
   dispatch({ type: ADD_TO_CART, payload: data });
}
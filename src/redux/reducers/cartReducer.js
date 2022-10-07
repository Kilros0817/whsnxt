import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    ADD_TO_CART,
    REMOVE_FROM_CART,
    SUB_QUANTITY,
    ADD_QUANTITY,
    EMPTY_CART
 } from "../actions/type";

 const cart = AsyncStorage.getItem('whsnxt_cart');

const initialState = {
    products: [],
  };

  const addItems = (data, product) =>{
    console.log("cart_state___________", data)

    const addedProduct = data.filter(object => object.id === product.id);
    if(addedProduct){
      product.quantity = addedProduct[0].quantity * 1 +  product.quantity * 1
    }
    const unModifiedRow = data.filter(object => object.id !== product.id);
    const cartData = [...unModifiedRow, product];
    return cartData;
  }

  const CartReducer = (state = initialState, action) => {
   // console.log("action------------------>", action);
    switch (action.type) {
      case ADD_TO_CART:{
        return {
          ...state,
          products: addItems(state.products, action.payload)
        }
      }
      case REMOVE_FROM_CART:
        return {
          ...state,
          products: state.products.map(product =>
              console.log(action.payload)
            ),
        };
      case ADD_QUANTITY:
        return {
          ...state,
          products: state.products.map(product =>
            product.id === action.id
              ? {...product, quantity: product.quantity + 1}
              : product,
          ),
        };
      case SUB_QUANTITY:
        return {
          ...state,
          products: state.products.map(product =>
            product.id === action.id
              ? {
                  ...product,
                  quantity: product.quantity !== 1 ? product.quantity - 1 : 1,
                }
              : product,
          ),
        };
      case EMPTY_CART:
        return {
          ...state,
          products: state.products.map(product =>
            product.selected
              ? {...product, selected: false, quantity: 1}
              : product,
          ),
        };
      default:
        return state;
    }
  };
  export {CartReducer};
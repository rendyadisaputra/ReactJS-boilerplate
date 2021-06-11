/* eslint-disable consistent-return */
import produce from 'immer';
import {
    GET_TRANSACTION_REQUEST,
    GET_TRANSACTION_FAILURE,
    GET_TRANSACTION_SUCCESS,

    // * Shopping Cart
    GET_SHOPPING_CART_SUCCESS,
    GET_SHOPPING_CART_REQUEST,
    GET_SHOPPING_CART_FAILURE,
    GET_COUNT_SHOPPING_CART_SUCCESS,
    GET_COUNT_SHOPPING_CART_REQUEST,
    GET_COUNT_SHOPPING_CART_FAILURE,


    ADD_TRANSACTION_REQUEST,
    ADD_TRANSACTION_FAILURE,
    ADD_TRANSACTION_SUCCESS,
    CHANGE_AMOUNT_REQUEST,
    CHANGE_AMOUNT_FAILURE,
    CHANGE_AMOUNT_SUCCESS,
    // * Create Payment
    CREATE_PAYMENT_REQUEST,
    CREATE_PAYMENT_FAILURE,
    CREATE_PAYMENT_SUCCESS,
} from './constants';

export const initialState = {
    cart: [],
    productCount: 0,
    loading: false,
    error: null,
    isSuccess: false,
    isError: false,
    loadingChangeAmount: false,
};

const cartPageReducer = (state = initialState, action) =>
    produce(state, (data) => {
        switch (action.type) {
            // * Get Transaction
            case GET_TRANSACTION_REQUEST:
                data.loading = false;
                data.error = null;
                break;
            case GET_SHOPPING_CART_REQUEST:
                data.loading = false;
                data.error = null;
                break;
            case GET_TRANSACTION_FAILURE:
                data.loading = false;
                data.error = null;
                data.cart = [];
                data.isSuccess = false;
                break;
            case GET_TRANSACTION_SUCCESS:
                data.loading = false;
                data.error = null;
                data.cart = action.payload;
                data.isSuccess = false;
                data.productCount = action.productCount;
                break;
                /** Shopping Cart */
            case GET_SHOPPING_CART_SUCCESS:
                data.loading = false;
                data.error = null;
                data.cart = action.payload;
                data.isSuccess = false;
                // data.productCount = action.productCount;
                console.log(" ON Shopping cart success", data.cart)
                break;
            case GET_COUNT_SHOPPING_CART_SUCCESS:
                data.loading = false;
                data.error = null;
                // data.cart = action.payload;
                data.isSuccess = false;
                data.productCount = action.payload.count;
                console.log(" ON counted Shopping cart counted", data.action)

                break;
                // * Create Order
            case ADD_TRANSACTION_REQUEST:
                data.loading = false;
                data.error = null;
                break;
            case ADD_TRANSACTION_FAILURE:
                data.loading = false;
                data.error = null;
                data.isSuccess = false;
                break;
            case ADD_TRANSACTION_SUCCESS:
                data.loading = false;
                data.error = null;
                data.isSuccess = true;
                break;

                // * Create Payment
            case CREATE_PAYMENT_REQUEST:
                data.loading = true;
                data.error = null;
                data.isError = false;
                data.isSuccess = false;
                break;
            case CREATE_PAYMENT_FAILURE:
                data.loading = false;
                data.error = action.error;
                data.isError = true;
                data.isSuccess = false;
                break;
            case CREATE_PAYMENT_SUCCESS:
                data.loading = false;
                data.error = null;
                data.isError = false;
                data.isSuccess = true;
                break;

                // * Change Amount
            case CHANGE_AMOUNT_REQUEST:
                data.loadingChangeAmount = true;
                data.cart[0].product[action.productId].amount = action.amount;
                break;
            case CHANGE_AMOUNT_FAILURE:
                data.loadingChangeAmount = false;
                break;
            case CHANGE_AMOUNT_SUCCESS:
                data.loadingChangeAmount = false;
                break;
            default:
                return {
                    ...data,
                };
        }
    });

export default cartPageReducer;
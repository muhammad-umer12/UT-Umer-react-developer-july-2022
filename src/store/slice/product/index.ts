import { combineReducers } from 'redux';

import productsReducer from './products';

const productRootReducer = combineReducers({ products: productsReducer });

export default productRootReducer;

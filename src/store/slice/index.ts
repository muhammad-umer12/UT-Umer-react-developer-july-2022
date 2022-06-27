import { combineReducers } from 'redux';

import productsReducer from './product/index';

const rootReducer = combineReducers({ product: productsReducer });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

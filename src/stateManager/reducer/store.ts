import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist'
import Auth from './auth.slice';
import Roles from './roles.slice';

const rootReducer = combineReducers({
  auth: Auth,
  roles: Roles
})

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})

const persistor = persistStore(store) 

export {store, persistor};
// AppDispatch includes:
// 1. Regular Redux actions
// 2. Async Thunk actions
// 3. Any middleware-enhanced dispatch methods
export type AppDispatch = typeof store.dispatch;
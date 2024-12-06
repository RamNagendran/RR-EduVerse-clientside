import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist'
import Auth from './auth.slice';

const rootReducer = combineReducers({
  auth: Auth
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
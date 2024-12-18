import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { PersistConfig} from 'redux-persist';
import { persistReducer, persistStore } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import todosReducer from './Todos/Todo.slice';

/**
 * An object that defines how to encrypt the persisted state.
 */
const encryptor = encryptTransform({
  secretKey: process.env.SECRET_KEY || 'redux-persist-secret-key',
});

/**
 * The root reducer that combines all reducers in the application.
 */
const rootReducer = combineReducers({
  todos: todosReducer,
});

/**
 * The configuration for the persisted state.
 */
const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
  key: 'root',
  storage,
  transforms: [encryptor],

  // The blacklist defines which reducers will not be persisted.
  blacklist: [],
};

/**
 * The persisted reducer that uses the encryption transform.
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * The store that combines the persisted reducer and the middleware.
 */
const store = configureStore({
  reducer: persistedReducer,
  devTools: __DEV__,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export default store;

/**
 * The persistor that is used to store the persisted state.
 */
export const persistor = persistStore(store);

// store.js
import { configureStore } from "@reduxjs/toolkit";
import localforage from "localforage";
import { combineReducers } from "redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import userReducer from "./slices/userSlice";

const combinedReducer = combineReducers({
  user: userReducer,
});

const rootReducer = (state, action) => {
  return combinedReducer(state, action);
};

const persistConfig = {
  key: "redux",
  storage: localforage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

localforage.config({
  driver: localforage.INDEXEDDB, 
  name: "chatbot",
  storeName: "chatbot",
  version: 1.0,
  description: "chatbot store",
});

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
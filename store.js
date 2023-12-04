import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { setupListeners } from "@reduxjs/toolkit/query";
import AuthReducer from "./redux/auth-user/AuthSlice";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: [],
};

const rootReducer = combineReducers({ auth: AuthReducer });
const middlewares = [];

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([...middlewares]),
});

setupListeners(store.dispatch);
export const persistor = persistStore(store);

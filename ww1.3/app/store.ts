import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import navReducer from "./slices/navSlice";
import favoritesReducer from "./slices/favoritesSlice";
import jobReducer from "./slices/jobSlice";
import publicChargersSlice from "./slices/publicChargersSlice";


export const store = configureStore({
  reducer: {
    nav: navReducer,
    favorites: favoritesReducer,
    job: jobReducer,
    publicChargers: publicChargersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type AppDispatch = typeof store.dispatch;

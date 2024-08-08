import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Favorite = {
  id: number;
  name: string;
  icon: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  }
};

export type FavoritesState = {
  favorites: Favorite[];
  nextId: number;
};

const initialState: FavoritesState = {
  favorites: [],
  nextId: 1, // Start at 1
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Omit<Favorite, 'id'>>) => {
      console.log("Adding Favorite Action:", action);

      const newFavorite: Favorite = {
        ...action.payload,
        id: state.nextId
      };
      state.favorites.push(newFavorite);
      state.nextId += 1; // Increment nextId
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      console.log("Removing Favorite Action:", action);

      state.favorites = state.favorites.filter(fav => fav.id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export const selectFavorites = (state: { favorites: FavoritesState }) => state.favorites.favorites;

export default favoritesSlice.reducer;

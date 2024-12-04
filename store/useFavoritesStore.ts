import { create } from 'zustand';

interface FavoritesState {
  favoritedListings: string[];
  addToFavorites: (listingId: string) => void;
  removeFromFavorites: (listingId: string) => void;
}

const useFavoritesStore = create<FavoritesState>((set) => ({
  favoritedListings: [],
  addToFavorites: (listingId) =>
    set((state) => ({
      favoritedListings: [...state.favoritedListings, listingId],
    })),
  removeFromFavorites: (listingId) =>
    set((state) => ({
      favoritedListings: state.favoritedListings.filter((id) => id !== listingId),
    })),
}));

export default useFavoritesStore;

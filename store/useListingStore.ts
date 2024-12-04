import { create } from 'zustand';
import { User } from './useAuthStore';

interface Listing {
  id: number;
  title: string;
  description: string;
  startingBid: number;
  imageUrl: string | null;
  category: string | null;
  createdBy: User;
  isActive: boolean;
  endTime: Date;
}

interface ListingStore {
  listings: Listing[];
  createListing: (listing: Omit<Listing, 'id' | 'isActive' | 'endTime'>) => void;
  // Другие методы для управления объявлениями
}

export const useListingStore = create<ListingStore>((set) => ({
  listings: [],
  createListing: (listing) => {
    const newListing: Listing = {
      id: Date.now(),
      isActive: true,
      endTime: new Date(Date.now() + 7 * 24 * 60 * 60), // Аукцион длится 7 дней
      ...listing,
    };
    set((state) => ({ listings: [...state.listings, newListing] }));
  },
}));

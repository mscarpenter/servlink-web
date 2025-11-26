import { create } from 'zustand';
import { ratingsAPI, type Rating, type CreateRatingData } from '@/lib/api/ratings';

interface RatingsState {
    ratings: Rating[];
    currentRating: Rating | null;
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchRatings: () => Promise<void>;
    fetchRatingById: (id: number) => Promise<void>;
    createRating: (data: CreateRatingData) => Promise<Rating>;
    fetchUserRatings: (userId: number) => Promise<any>;
    clearError: () => void;
}

export const useRatingsStore = create<RatingsState>((set) => ({
    ratings: [],
    currentRating: null,
    isLoading: false,
    error: null,

    fetchRatings: async () => {
        set({ isLoading: true, error: null });
        try {
            const ratings = await ratingsAPI.getAll();
            set({ ratings, isLoading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Erro ao carregar avaliações',
                isLoading: false,
            });
        }
    },

    fetchRatingById: async (id: number) => {
        set({ isLoading: true, error: null });
        try {
            const rating = await ratingsAPI.getById(id);
            set({ currentRating: rating, isLoading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Erro ao carregar avaliação',
                isLoading: false,
            });
        }
    },

    createRating: async (data: CreateRatingData) => {
        set({ isLoading: true, error: null });
        try {
            const rating = await ratingsAPI.create(data);
            set((state) => ({
                ratings: [rating, ...state.ratings],
                isLoading: false,
            }));
            return rating;
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Erro ao criar avaliação',
                isLoading: false,
            });
            throw error;
        }
    },

    fetchUserRatings: async (userId: number) => {
        set({ isLoading: true, error: null });
        try {
            const data = await ratingsAPI.getUserRatings(userId);
            set({ isLoading: false });
            return data;
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Erro ao carregar avaliações do usuário',
                isLoading: false,
            });
            throw error;
        }
    },

    clearError: () => {
        set({ error: null });
    },
}));

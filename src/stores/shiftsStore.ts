import { create } from 'zustand';
import { shiftsAPI, type Shift, type CheckInData } from '@/lib/api/shifts';

interface ShiftsState {
    shifts: Shift[];
    currentShift: Shift | null;
    isLoading: boolean;
    error: string | null;
    stats: any;

    // Actions
    fetchShifts: (filters?: { status?: string; date?: string }) => Promise<void>;
    fetchShiftById: (id: number) => Promise<void>;
    checkIn: (id: number, data?: CheckInData) => Promise<void>;
    checkOut: (id: number) => Promise<void>;
    fetchStats: () => Promise<void>;
    clearError: () => void;
}

export const useShiftsStore = create<ShiftsState>((set) => ({
    shifts: [],
    currentShift: null,
    isLoading: false,
    error: null,
    stats: null,

    fetchShifts: async (filters?) => {
        set({ isLoading: true, error: null });
        try {
            const response = await shiftsAPI.getAll(filters);
            // Handle pagination or direct array response
            const shiftsList = Array.isArray(response) ? response : (response.data || []);
            set({ shifts: shiftsList, isLoading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Erro ao carregar turnos',
                isLoading: false,
            });
        }
    },

    fetchShiftById: async (id: number) => {
        set({ isLoading: true, error: null });
        try {
            const shift = await shiftsAPI.getById(id);
            set({ currentShift: shift, isLoading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Erro ao carregar turno',
                isLoading: false,
            });
        }
    },

    checkIn: async (id: number, data?) => {
        set({ isLoading: true, error: null });
        try {
            const shift = await shiftsAPI.checkIn(id, data);
            set((state) => ({
                shifts: state.shifts.map((s) => (s.id === id ? shift : s)),
                currentShift: state.currentShift?.id === id ? shift : state.currentShift,
                isLoading: false,
            }));
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Erro ao fazer check-in',
                isLoading: false,
            });
            throw error;
        }
    },

    checkOut: async (id: number) => {
        set({ isLoading: true, error: null });
        try {
            const shift = await shiftsAPI.checkOut(id);
            set((state) => ({
                shifts: state.shifts.map((s) => (s.id === id ? shift : s)),
                currentShift: state.currentShift?.id === id ? shift : state.currentShift,
                isLoading: false,
            }));
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Erro ao fazer check-out',
                isLoading: false,
            });
            throw error;
        }
    },

    fetchStats: async () => {
        set({ isLoading: true, error: null });
        try {
            const stats = await shiftsAPI.getStats();
            set({ stats, isLoading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Erro ao carregar estatísticas',
                isLoading: false,
            });
        }
    },

    clearError: () => {
        set({ error: null });
    },
}));

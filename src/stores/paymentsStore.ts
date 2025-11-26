import { create } from 'zustand';
import { paymentsAPI, type Payment, type PaymentFilters } from '@/lib/api/payments';

interface PaymentsState {
    payments: Payment[];
    currentPayment: Payment | null;
    isLoading: boolean;
    error: string | null;
    stats: any;

    // Actions
    fetchPayments: (filters?: PaymentFilters) => Promise<void>;
    fetchPaymentById: (id: number) => Promise<void>;
    fetchStats: () => Promise<void>;
    clearError: () => void;
}

export const usePaymentsStore = create<PaymentsState>((set) => ({
    payments: [],
    currentPayment: null,
    isLoading: false,
    error: null,
    stats: null,

    fetchPayments: async (filters?) => {
        set({ isLoading: true, error: null });
        try {
            const payments = await paymentsAPI.getAll(filters);
            set({ payments, isLoading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Erro ao carregar pagamentos',
                isLoading: false,
            });
        }
    },

    fetchPaymentById: async (id: number) => {
        set({ isLoading: true, error: null });
        try {
            const payment = await paymentsAPI.getById(id);
            set({ currentPayment: payment, isLoading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Erro ao carregar pagamento',
                isLoading: false,
            });
        }
    },

    fetchStats: async () => {
        set({ isLoading: true, error: null });
        try {
            const stats = await paymentsAPI.getStats();
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

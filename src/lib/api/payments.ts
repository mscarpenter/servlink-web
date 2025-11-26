import api from './axios';

export interface Payment {
    id: number;
    shift_id: number;
    amount: number;
    commission: number;
    net_amount: number;
    status: 'pending' | 'processed' | 'paid' | 'failed';
    transaction_id?: string;
    processed_at?: string;
    created_at: string;
    updated_at: string;
    shift?: {
        id: number;
        job_id: number;
        confirmed_hours?: number;
        job?: {
            id: number;
            title: string;
            category: string;
            rate: number;
            rate_type: string;
        };
    };
}

export interface PaymentFilters {
    status?: string;
    date_from?: string;
    date_to?: string;
}

export const paymentsAPI = {
    /**
     * Listar pagamentos (profissional vê recebidos, estabelecimento vê efetuados)
     */
    getAll: async (filters?: PaymentFilters) => {
        const params = new URLSearchParams();
        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value) params.append(key, value);
            });
        }
        const response = await api.get(`/payments?${params.toString()}`);
        return response.data;
    },

    /**
     * Obter um pagamento específico
     */
    getById: async (id: number): Promise<Payment> => {
        const response = await api.get(`/payments/${id}`);
        return response.data;
    },

    /**
     * Obter estatísticas de pagamentos
     */
    getStats: async () => {
        const response = await api.get('/payments/stats');
        return response.data;
    },
};

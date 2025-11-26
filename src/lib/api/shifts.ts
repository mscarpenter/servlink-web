import api from './axios';

export interface Shift {
    id: number;
    job_id: number;
    professional_user_id: number;
    application_id: number;
    scheduled_start: string;
    scheduled_end: string;
    actual_start?: string;
    actual_end?: string;
    confirmed_hours?: number;
    status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
    qr_code?: string;
    created_at: string;
    updated_at: string;
    job?: {
        id: number;
        title: string;
        category: string;
        location: string;
        rate: number;
        rate_type: string;
    };
    professional?: {
        id: number;
        full_name: string;
        photo_url?: string;
    };
}

export interface CheckInData {
    qr_code?: string;
}

export const shiftsAPI = {
    /**
     * Listar turnos (profissional vê seus turnos, estabelecimento vê todos)
     */
    getAll: async (filters?: { status?: string; date?: string }) => {
        const params = new URLSearchParams();
        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value) params.append(key, value);
            });
        }
        const response = await api.get(`/shifts?${params.toString()}`);
        return response.data;
    },

    /**
     * Obter um turno específico
     */
    getById: async (id: number): Promise<Shift> => {
        const response = await api.get(`/shifts/${id}`);
        return response.data;
    },

    /**
     * Check-in em um turno
     */
    checkIn: async (id: number, data?: CheckInData): Promise<Shift> => {
        const response = await api.post(`/shifts/${id}/check-in`, data);
        return response.data;
    },

    /**
     * Check-out de um turno
     */
    checkOut: async (id: number): Promise<Shift> => {
        const response = await api.post(`/shifts/${id}/check-out`);
        return response.data;
    },

    /**
     * Obter estatísticas de turnos
     */
    getStats: async () => {
        const response = await api.get('/shifts/stats');
        return response.data;
    },
};

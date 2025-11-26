import api from './axios';

export interface Job {
    id: number;
    establishment_user_id: number;
    title: string;
    description: string;
    category: string;
    rate: number;
    rate_type: 'Hourly' | 'Fixed';
    location: string;
    date: string;
    start_time: string;
    end_time: string;
    slots_available: number;
    slots_filled: number;
    status: 'open' | 'closed' | 'cancelled';
    requirements?: string;
    created_at: string;
    updated_at: string;
    establishment?: {
        id: number;
        user_id: number;
        company_name: string;
        cnpj?: string;
        logo_url?: string;
        average_rating?: number;
    };
}

export interface CreateJobData {
    title: string;
    description: string;
    category: string;
    rate: number;
    rate_type: 'Hourly' | 'Fixed';
    location: string;
    date: string;
    start_time: string;
    end_time: string;
    slots_available: number;
    requirements?: string;
}

export interface JobFilters {
    category?: string;
    location?: string;
    date?: string;
    min_rate?: number;
    max_rate?: number;
    status?: string;
}

export const jobsAPI = {
    /**
     * Listar todas as vagas (com filtros opcionais)
     */
    getAll: async (filters?: JobFilters) => {
        const params = new URLSearchParams();
        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== '') {
                    params.append(key, value.toString());
                }
            });
        }
        const response = await api.get(`/jobs?${params.toString()}`);
        return response.data;
    },

    /**
     * Obter uma vaga específica
     */
    getById: async (id: number): Promise<Job> => {
        const response = await api.get(`/jobs/${id}`);
        return response.data;
    },

    /**
     * Criar nova vaga (apenas estabelecimentos)
     */
    create: async (data: CreateJobData): Promise<Job> => {
        const response = await api.post('/jobs', data);
        return response.data;
    },

    /**
     * Atualizar vaga existente
     */
    update: async (id: number, data: Partial<CreateJobData>): Promise<Job> => {
        const response = await api.put(`/jobs/${id}`, data);
        return response.data;
    },

    /**
     * Deletar vaga
     */
    delete: async (id: number): Promise<void> => {
        await api.delete(`/jobs/${id}`);
    },

    /**
     * Obter vagas do estabelecimento autenticado
     */
    getMyJobs: async () => {
        const response = await api.get('/jobs?my_jobs=true');
        return response.data;
    },
};

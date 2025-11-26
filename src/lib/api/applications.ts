import api from './axios';

export interface Application {
    id: number;
    job_id: number;
    professional_user_id: number;
    status: 'pending' | 'approved' | 'rejected';
    applied_at: string;
    reviewed_at?: string;
    created_at: string;
    updated_at: string;
    job?: {
        id: number;
        title: string;
        category: string;
        rate: number;
        rate_type: string;
        date: string;
        start_time: string;
        end_time: string;
        location: string;
    };
    professional?: {
        id: number;
        user_id: number;
        full_name: string;
        cpf?: string;
        photo_url?: string;
        overall_rating?: number;
    };
}

export interface CreateApplicationData {
    job_id: number;
}

export const applicationsAPI = {
    /**
     * Listar candidaturas (profissional vê suas candidaturas, estabelecimento vê candidatos)
     */
    getAll: async (jobId?: number) => {
        const url = jobId ? `/applications?job_id=${jobId}` : '/applications';
        const response = await api.get(url);
        return response.data;
    },

    /**
     * Obter uma candidatura específica
     */
    getById: async (id: number): Promise<Application> => {
        const response = await api.get(`/applications/${id}`);
        return response.data;
    },

    /**
     * Criar nova candidatura (profissional se candidata a uma vaga)
     */
    create: async (data: CreateApplicationData): Promise<Application> => {
        const response = await api.post('/applications', data);
        return response.data;
    },

    /**
     * Aprovar candidatura (estabelecimento)
     */
    approve: async (id: number): Promise<Application> => {
        const response = await api.patch(`/applications/${id}/approve`);
        return response.data;
    },

    /**
     * Rejeitar candidatura (estabelecimento)
     */
    reject: async (id: number): Promise<Application> => {
        const response = await api.patch(`/applications/${id}/reject`);
        return response.data;
    },

    /**
     * Cancelar candidatura (profissional)
     */
    cancel: async (id: number): Promise<void> => {
        await api.delete(`/applications/${id}`);
    },
};

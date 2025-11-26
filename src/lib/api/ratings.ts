import api from './axios';

export interface Rating {
    id: number;
    shift_id: number;
    rater_user_id: number;
    receiver_user_id: number;
    score: number;
    comment?: string;
    created_at: string;
    updated_at: string;
    shift?: {
        id: number;
        job?: {
            title: string;
            category: string;
        };
    };
    rater?: {
        id: number;
        name: string;
        role: string;
    };
    receiver?: {
        id: number;
        name: string;
        role: string;
    };
}

export interface CreateRatingData {
    shift_id: number;
    receiver_user_id: number;
    score: number;
    comment?: string;
}

export const ratingsAPI = {
    /**
     * Listar avaliações (minhas avaliações recebidas)
     */
    getAll: async () => {
        const response = await api.get('/ratings');
        return response.data;
    },

    /**
     * Obter uma avaliação específica
     */
    getById: async (id: number): Promise<Rating> => {
        const response = await api.get(`/ratings/${id}`);
        return response.data;
    },

    /**
     * Criar nova avaliação
     */
    create: async (data: CreateRatingData): Promise<Rating> => {
        const response = await api.post('/ratings', data);
        return response.data;
    },

    /**
     * Obter avaliações de um usuário específico (público)
     */
    getUserRatings: async (userId: number) => {
        const response = await api.get(`/users/${userId}/ratings`);
        return response.data;
    },
};

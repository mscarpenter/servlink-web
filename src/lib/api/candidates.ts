import api from './axios';

export interface Professional {
    id: number;
    name: string;
    email: string;
    role: 'professional';
    professional_profile: {
        id: number;
        user_id: number;
        full_name: string;
        cpf: string;
        phone: string;
        bio: string;
        photo_url: string;
        overall_rating: number;
        skills: string[]; // Assumindo que skills venha como array ou string JSON
    } | null;
}

export const candidatesAPI = {
    getAll: async () => {
        const response = await api.get<Professional[]>('/professionals');
        return response.data;
    },
    getById: async (id: string | number) => {
        const response = await api.get<Professional>(`/professionals/${id}`);
        return response.data;
    }
};

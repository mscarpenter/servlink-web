import api from './axios';

export interface Profile {
    id: number;
    user_id: number;
    full_name?: string;
    company_name?: string;
    cpf?: string;
    cnpj?: string;
    phone?: string;
    photo_url?: string;
    logo_url?: string;
    bio?: string;
    overall_rating?: number;
    average_rating?: number;
}

export interface UpdateProfileData {
    full_name?: string;
    company_name?: string;
    phone?: string;
    bio?: string;
}

export const profileAPI = {
    /**
     * Obter perfil do usuário autenticado
     */
    get: async (): Promise<Profile> => {
        const response = await api.get('/profile');
        return response.data;
    },

    /**
     * Atualizar perfil (profissional)
     */
    updateProfessional: async (data: UpdateProfileData): Promise<Profile> => {
        const response = await api.put('/profile/professional', data);
        return response.data;
    },

    /**
     * Atualizar perfil (estabelecimento)
     */
    updateEstablishment: async (data: UpdateProfileData): Promise<Profile> => {
        const response = await api.put('/profile/establishment', data);
        return response.data;
    },

    /**
     * Upload de foto/logo
     */
    uploadPhoto: async (file: File): Promise<{ photo_url?: string; logo_url?: string }> => {
        const formData = new FormData();
        formData.append('photo', file);

        const response = await api.post('/profile/upload-photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    /**
     * Validar CPF
     */
    validateCPF: async (cpf: string): Promise<{ valid: boolean }> => {
        const response = await api.post('/profile/validate-cpf', { cpf });
        return response.data;
    },

    /**
     * Validar CNPJ
     */
    validateCNPJ: async (cnpj: string): Promise<{ valid: boolean }> => {
        const response = await api.post('/profile/validate-cnpj', { cnpj });
        return response.data;
    },
};

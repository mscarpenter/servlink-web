import api from './axios';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: 'professional' | 'establishment';
    full_name?: string;  // Para profissional
    company_name?: string;  // Para estabelecimento
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
    };
}

export const authAPI = {
    /**
     * Login de usuário
     */
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await api.post('/login', credentials);
        return response.data;
    },

    /**
     * Registro de novo usuário
     */
    register: async (data: RegisterData): Promise<AuthResponse> => {
        const response = await api.post('/register', data);
        return response.data;
    },

    /**
     * Logout
     */
    logout: async (): Promise<void> => {
        await api.post('/logout');
    },

    /**
     * Obter usuário autenticado
     */
    getUser: async () => {
        const response = await api.get('/user');
        return response.data;
    },
};

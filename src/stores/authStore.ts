import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authAPI, type AuthResponse } from '@/lib/api/auth';

interface User {
    id: number;
    name: string;
    email: string;
    role: 'professional' | 'establishment';
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // Actions
    login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
    register: (data: any) => Promise<void>;
    logout: () => Promise<void>;
    setUser: (user: User) => void;
    clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            login: async (email: string, password: string, rememberMe: boolean = true) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await authAPI.login({ email, password });

                    // Salvar token no storage apropriado
                    if (rememberMe) {
                        localStorage.setItem('auth_token', response.access_token);
                        sessionStorage.removeItem('auth_token');
                    } else {
                        sessionStorage.setItem('auth_token', response.access_token);
                        localStorage.removeItem('auth_token');
                    }

                    set({
                        user: response.user as User,
                        token: response.access_token,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Erro ao fazer login',
                        isLoading: false,
                    });
                    throw error;
                }
            },

            register: async (data: any) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await authAPI.register(data);

                    // Registro sempre salva em localStorage por padrão (ou poderia ser session)
                    localStorage.setItem('auth_token', response.access_token);

                    set({
                        user: response.user as User,
                        token: response.access_token,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Erro ao registrar',
                        isLoading: false,
                    });
                    throw error;
                }
            },

            logout: async () => {
                try {
                    await authAPI.logout();
                } catch (error) {
                    console.error('Erro ao fazer logout:', error);
                } finally {
                    // Limpar estado e storages
                    localStorage.removeItem('auth_token');
                    sessionStorage.removeItem('auth_token');
                    localStorage.removeItem('user'); // Limpar persistência do user também se necessário
                    set({
                        user: null,
                        token: null,
                        isAuthenticated: false,
                        error: null,
                    });
                }
            },

            setUser: (user: User) => {
                set({ user, isAuthenticated: true });
            },

            clearError: () => {
                set({ error: null });
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                // Não persistimos o token aqui via zustand para ter controle manual (local vs session)
                // token: state.token, 
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);

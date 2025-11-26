import { create } from 'zustand';
import { applicationsAPI, type Application, type CreateApplicationData } from '@/lib/api/applications';

interface ApplicationsState {
    applications: Application[];
    currentApplication: Application | null;
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchApplications: (jobId?: number) => Promise<void>;
    fetchApplicationById: (id: number) => Promise<void>;
    createApplication: (data: CreateApplicationData) => Promise<Application>;
    approveApplication: (id: number) => Promise<void>;
    rejectApplication: (id: number) => Promise<void>;
    cancelApplication: (id: number) => Promise<void>;
    clearError: () => void;
}

export const useApplicationsStore = create<ApplicationsState>((set) => ({
    applications: [],
    currentApplication: null,
    isLoading: false,
    error: null,

    fetchApplications: async (jobId?: number) => {
        set({ isLoading: true, error: null });
        try {
            const applications = await applicationsAPI.getAll(jobId);
            set({ applications, isLoading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Erro ao carregar candidaturas',
                isLoading: false,
            });
        }
    },

    fetchApplicationById: async (id: number) => {
        set({ isLoading: true, error: null });
        try {
            const application = await applicationsAPI.getById(id);
            set({ currentApplication: application, isLoading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Erro ao carregar candidatura',
                isLoading: false,
            });
        }
    },

    createApplication: async (data: CreateApplicationData) => {
        set({ isLoading: true, error: null });
        try {
            const application = await applicationsAPI.create(data);
            set((state) => ({
                applications: [application, ...state.applications],
                isLoading: false,
            }));
            return application;
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Erro ao criar candidatura',
                isLoading: false,
            });
            throw error;
        }
    },

    approveApplication: async (id: number) => {
        set({ isLoading: true, error: null });
        try {
            const updatedApplication = await applicationsAPI.approve(id);
            set((state) => ({
                applications: state.applications.map((app) =>
                    app.id === id ? updatedApplication : app
                ),
                isLoading: false,
            }));
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Erro ao aprovar candidatura',
                isLoading: false,
            });
            throw error;
        }
    },

    rejectApplication: async (id: number) => {
        set({ isLoading: true, error: null });
        try {
            const updatedApplication = await applicationsAPI.reject(id);
            set((state) => ({
                applications: state.applications.map((app) =>
                    app.id === id ? updatedApplication : app
                ),
                isLoading: false,
            }));
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Erro ao rejeitar candidatura',
                isLoading: false,
            });
            throw error;
        }
    },

    cancelApplication: async (id: number) => {
        set({ isLoading: true, error: null });
        try {
            await applicationsAPI.cancel(id);
            set((state) => ({
                applications: state.applications.filter((app) => app.id !== id),
                isLoading: false,
            }));
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Erro ao cancelar candidatura',
                isLoading: false,
            });
            throw error;
        }
    },

    clearError: () => {
        set({ error: null });
    },
}));

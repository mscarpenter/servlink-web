import { create } from 'zustand';
import { jobsAPI, type Job, type CreateJobData, type JobFilters } from '@/lib/api/jobs';

interface JobsState {
    jobs: Job[];
    currentJob: Job | null;
    isLoading: boolean;
    error: string | null;
    filters: JobFilters;

    // Actions
    fetchJobs: (filters?: JobFilters) => Promise<void>;
    fetchJobById: (id: number) => Promise<void>;
    createJob: (data: CreateJobData) => Promise<Job>;
    updateJob: (id: number, data: Partial<CreateJobData>) => Promise<void>;
    deleteJob: (id: number) => Promise<void>;
    setFilters: (filters: JobFilters) => void;
    clearError: () => void;
}

export const useJobsStore = create<JobsState>((set, get) => ({
    jobs: [],
    currentJob: null,
    isLoading: false,
    error: null,
    filters: {},

    fetchJobs: async (filters?: JobFilters) => {
        set({ isLoading: true, error: null });
        try {
            const response = await jobsAPI.getAll(filters || get().filters);
            // Handle pagination or direct array response
            const jobsList = Array.isArray(response) ? response : (response.data || []);
            set({ jobs: jobsList, isLoading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Erro ao carregar vagas',
                isLoading: false,
            });
        }
    },

    fetchJobById: async (id: number) => {
        set({ isLoading: true, error: null });
        try {
            const job = await jobsAPI.getById(id);
            set({ currentJob: job, isLoading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Erro ao carregar vaga',
                isLoading: false,
            });
        }
    },

    createJob: async (data: CreateJobData) => {
        set({ isLoading: true, error: null });
        try {
            const job = await jobsAPI.create(data);
            set((state) => ({
                jobs: [job, ...state.jobs],
                isLoading: false,
            }));
            return job;
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Erro ao criar vaga',
                isLoading: false,
            });
            throw error;
        }
    },

    updateJob: async (id: number, data: Partial<CreateJobData>) => {
        set({ isLoading: true, error: null });
        try {
            const updatedJob = await jobsAPI.update(id, data);
            set((state) => ({
                jobs: state.jobs.map((job) => (job.id === id ? updatedJob : job)),
                currentJob: state.currentJob?.id === id ? updatedJob : state.currentJob,
                isLoading: false,
            }));
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Erro ao atualizar vaga',
                isLoading: false,
            });
            throw error;
        }
    },

    deleteJob: async (id: number) => {
        set({ isLoading: true, error: null });
        try {
            await jobsAPI.delete(id);
            set((state) => ({
                jobs: state.jobs.filter((job) => job.id !== id),
                isLoading: false,
            }));
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Erro ao deletar vaga',
                isLoading: false,
            });
            throw error;
        }
    },

    setFilters: (filters: JobFilters) => {
        set({ filters });
    },

    clearError: () => {
        set({ error: null });
    },
}));

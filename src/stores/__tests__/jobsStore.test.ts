import { renderHook, act } from '@testing-library/react';
import { useJobsStore } from '../jobsStore';

// Mock the API
jest.mock('@/lib/api/jobs', () => ({
    jobsAPI: {
        getAll: jest.fn(),
        getById: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    },
}));

import { jobsAPI } from '@/lib/api/jobs';

describe('useJobsStore', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        useJobsStore.setState({
            jobs: [],
            currentJob: null,
            isLoading: false,
            error: null,
            filters: {},
        });
    });

    it('should initialize with default values', () => {
        const { result } = renderHook(() => useJobsStore());

        expect(result.current.jobs).toEqual([]);
        expect(result.current.currentJob).toBeNull();
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('should fetch jobs successfully', async () => {
        const mockJobs = [
            {
                id: 1,
                title: 'Bartender',
                category: 'Bartender',
                rate: 50,
                rate_type: 'Hourly' as const,
                location: 'São Paulo',
                date: '2025-12-01',
                start_time: '18:00',
                end_time: '23:00',
                slots_available: 2,
                slots_filled: 0,
                status: 'open' as const,
                description: 'Test job',
                establishment_user_id: 1,
                created_at: '2025-11-24',
                updated_at: '2025-11-24',
            },
        ];

        (jobsAPI.getAll as jest.Mock).mockResolvedValue(mockJobs);

        const { result } = renderHook(() => useJobsStore());

        await act(async () => {
            await result.current.fetchJobs();
        });

        expect(result.current.jobs).toEqual(mockJobs);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('should handle fetch jobs error', async () => {
        const errorMessage = 'Failed to fetch jobs';
        (jobsAPI.getAll as jest.Mock).mockRejectedValue({
            response: { data: { message: errorMessage } },
        });

        const { result } = renderHook(() => useJobsStore());

        await act(async () => {
            await result.current.fetchJobs();
        });

        expect(result.current.jobs).toEqual([]);
        expect(result.current.error).toBe(errorMessage);
        expect(result.current.isLoading).toBe(false);
    });

    it('should create job successfully', async () => {
        const newJob = {
            id: 2,
            title: 'Garçom',
            category: 'Garçom',
            rate: 40,
            rate_type: 'Hourly' as const,
            location: 'Rio de Janeiro',
            date: '2025-12-05',
            start_time: '19:00',
            end_time: '00:00',
            slots_available: 3,
            slots_filled: 0,
            status: 'open' as const,
            description: 'New job',
            establishment_user_id: 1,
            created_at: '2025-11-24',
            updated_at: '2025-11-24',
        };

        (jobsAPI.create as jest.Mock).mockResolvedValue(newJob);

        const { result } = renderHook(() => useJobsStore());

        await act(async () => {
            await result.current.createJob({
                title: 'Garçom',
                description: 'New job',
                category: 'Garçom',
                rate: 40,
                rate_type: 'Hourly',
                location: 'Rio de Janeiro',
                date: '2025-12-05',
                start_time: '19:00',
                end_time: '00:00',
                slots_available: 3,
            });
        });

        expect(result.current.jobs).toContainEqual(newJob);
        expect(result.current.isLoading).toBe(false);
    });

    it('should delete job successfully', async () => {
        const initialJobs = [
            {
                id: 1,
                title: 'Bartender',
                category: 'Bartender',
                rate: 50,
                rate_type: 'Hourly' as const,
                location: 'São Paulo',
                date: '2025-12-01',
                start_time: '18:00',
                end_time: '23:00',
                slots_available: 2,
                slots_filled: 0,
                status: 'open' as const,
                description: 'Test job',
                establishment_user_id: 1,
                created_at: '2025-11-24',
                updated_at: '2025-11-24',
            },
        ];

        useJobsStore.setState({ jobs: initialJobs });

        (jobsAPI.delete as jest.Mock).mockResolvedValue(undefined);

        const { result } = renderHook(() => useJobsStore());

        await act(async () => {
            await result.current.deleteJob(1);
        });

        expect(result.current.jobs).toEqual([]);
    });

    it('should clear error', () => {
        const { result } = renderHook(() => useJobsStore());

        act(() => {
            useJobsStore.setState({ error: 'Some error' });
            result.current.clearError();
        });

        expect(result.current.error).toBeNull();
    });
});

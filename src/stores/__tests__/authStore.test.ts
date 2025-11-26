import { renderHook, act } from '@testing-library/react';
import { useAuthStore } from '../authStore';

describe('useAuthStore', () => {
    beforeEach(() => {
        // Reset store before each test
        useAuthStore.setState({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
        });
    });

    it('should initialize with default values', () => {
        const { result } = renderHook(() => useAuthStore());

        expect(result.current.user).toBeNull();
        expect(result.current.token).toBeNull();
        expect(result.current.isAuthenticated).toBe(false);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('should set user and token on successful login', async () => {
        const { result } = renderHook(() => useAuthStore());

        const mockUser = {
            id: 1,
            name: 'Test User',
            email: 'test@example.com',
            role: 'professional' as const,
        };

        const mockToken = 'mock-token-123';

        act(() => {
            result.current.setUser(mockUser);
            result.current.setToken(mockToken);
        });

        expect(result.current.user).toEqual(mockUser);
        expect(result.current.token).toBe(mockToken);
        expect(result.current.isAuthenticated).toBe(true);
    });

    it('should clear user and token on logout', () => {
        const { result } = renderHook(() => useAuthStore());

        // Set initial state
        act(() => {
            result.current.setUser({
                id: 1,
                name: 'Test User',
                email: 'test@example.com',
                role: 'professional',
            });
            result.current.setToken('mock-token');
        });

        // Logout
        act(() => {
            result.current.logout();
        });

        expect(result.current.user).toBeNull();
        expect(result.current.token).toBeNull();
        expect(result.current.isAuthenticated).toBe(false);
    });

    it('should set error message', () => {
        const { result } = renderHook(() => useAuthStore());

        const errorMessage = 'Invalid credentials';

        act(() => {
            result.current.setError(errorMessage);
        });

        expect(result.current.error).toBe(errorMessage);
    });

    it('should clear error message', () => {
        const { result } = renderHook(() => useAuthStore());

        act(() => {
            result.current.setError('Some error');
            result.current.clearError();
        });

        expect(result.current.error).toBeNull();
    });

    it('should set loading state', () => {
        const { result } = renderHook(() => useAuthStore());

        act(() => {
            result.current.setLoading(true);
        });

        expect(result.current.isLoading).toBe(true);

        act(() => {
            result.current.setLoading(false);
        });

        expect(result.current.isLoading).toBe(false);
    });
});

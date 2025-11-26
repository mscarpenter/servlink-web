'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { CircularProgress, Box } from '@mui/material';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: ('professional' | 'establishment')[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
    const router = useRouter();
    const { isAuthenticated, user } = useAuthStore();

    useEffect(() => {
        // Se não estiver autenticado, redirecionar para login
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }

        // Se houver restrição de roles e o usuário não tiver permissão
        if (allowedRoles && user && !allowedRoles.includes(user.role)) {
            router.push('/unauthorized');
        }
    }, [isAuthenticated, user, allowedRoles, router]);

    // Mostrar loading enquanto verifica autenticação
    if (!isAuthenticated) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    // Se houver restrição de roles e o usuário não tiver permissão
    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        return null;
    }

    return <>{children}</>;
}

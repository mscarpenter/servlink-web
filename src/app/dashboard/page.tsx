'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Container,
    Box,
    Typography,
    Paper,
    Grid,
    Chip,
    Button,
    CircularProgress,
    Alert,
    Avatar,
    Divider,
} from '@mui/material';
import {
    Work,
    Schedule,
    CheckCircle,
    Cancel,
    HourglassEmpty,
    LocationOn,
    AttachMoney,
} from '@mui/icons-material';
import { useApplicationsStore } from '@/stores/applicationsStore';
import { useAuthStore } from '@/stores/authStore';
import ProtectedRoute from '@/components/ProtectedRoute';

const MAR_PROFUNDO = '#003366';

function DashboardContent() {
    const router = useRouter();
    const { user } = useAuthStore();
    const { applications, isLoading, error, fetchApplications, cancelApplication, clearError } = useApplicationsStore();

    useEffect(() => {
        fetchApplications();
    }, [fetchApplications]);

    const handleCancel = async (id: number) => {
        if (confirm('Deseja realmente cancelar esta candidatura?')) {
            try {
                await cancelApplication(id);
            } catch (error) {
                console.error('Erro ao cancelar:', error);
            }
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'approved':
                return <CheckCircle sx={{ color: 'success.main' }} />;
            case 'rejected':
                return <Cancel sx={{ color: 'error.main' }} />;
            default:
                return <HourglassEmpty sx={{ color: 'warning.main' }} />;
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'approved':
                return 'Aprovada';
            case 'rejected':
                return 'Rejeitada';
            default:
                return 'Pendente';
        }
    };

    const getStatusColor = (status: string): 'success' | 'error' | 'warning' => {
        switch (status) {
            case 'approved':
                return 'success';
            case 'rejected':
                return 'error';
            default:
                return 'warning';
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
    };

    const formatTime = (timeString: string) => {
        return timeString.substring(0, 5);
    };

    const pendingApplications = applications.filter(app => app.status === 'pending');
    const approvedApplications = applications.filter(app => app.status === 'approved');
    const rejectedApplications = applications.filter(app => app.status === 'rejected');

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: MAR_PROFUNDO, mb: 1 }}>
                    Meu Dashboard
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Bem-vindo, {user?.name}!
                </Typography>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={4}>
                    <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
                        <HourglassEmpty sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                            {pendingApplications.length}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Pendentes
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
                        <CheckCircle sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                            {approvedApplications.length}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Aprovadas
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
                        <Work sx={{ fontSize: 40, color: MAR_PROFUNDO, mb: 1 }} />
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                            {applications.length}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Total de Candidaturas
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* Error Alert */}
            {error && (
                <Alert severity="error" sx={{ mb: 3 }} onClose={clearError}>
                    {error}
                </Alert>
            )}

            {/* Loading */}
            {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                    <CircularProgress />
                </Box>
            )}

            {/* Applications List */}
            {!isLoading && (
                <>
                    {applications.length === 0 ? (
                        <Paper elevation={2} sx={{ p: 6, textAlign: 'center' }}>
                            <Work sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                                Nenhuma candidatura ainda
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                Comece a se candidatar para vagas disponíveis
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={() => router.push('/vagas')}
                                sx={{ bgcolor: MAR_PROFUNDO }}
                            >
                                Ver Vagas
                            </Button>
                        </Paper>
                    ) : (
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                Minhas Candidaturas
                            </Typography>

                            <Grid container spacing={3}>
                                {applications.map((application) => (
                                    <Grid item xs={12} key={application.id}>
                                        <Paper elevation={2} sx={{ p: 3 }}>
                                            <Grid container spacing={2} alignItems="center">
                                                {/* Job Info */}
                                                <Grid item xs={12} md={6}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                        <Avatar sx={{ bgcolor: MAR_PROFUNDO }}>
                                                            <Work />
                                                        </Avatar>
                                                        <Box>
                                                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                                {application.job?.title}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {application.job?.category}
                                                            </Typography>
                                                        </Box>
                                                    </Box>

                                                    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <LocationOn sx={{ fontSize: 18, color: 'text.secondary' }} />
                                                            <Typography variant="body2" color="text.secondary">
                                                                {application.job?.location}
                                                            </Typography>
                                                        </Box>

                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <Schedule sx={{ fontSize: 18, color: 'text.secondary' }} />
                                                            <Typography variant="body2" color="text.secondary">
                                                                {application.job && formatDate(application.job.date)} • {application.job && formatTime(application.job.start_time)} - {application.job && formatTime(application.job.end_time)}
                                                            </Typography>
                                                        </Box>

                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <AttachMoney sx={{ fontSize: 18, color: 'text.secondary' }} />
                                                            <Typography variant="body2" fontWeight={600}>
                                                                R$ {application.job?.rate.toFixed(2)} {application.job?.rate_type === 'Hourly' ? '/hora' : 'fixo'}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Grid>

                                                {/* Status & Actions */}
                                                <Grid item xs={12} md={6}>
                                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'flex-start', md: 'flex-end' }, gap: 2 }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            {getStatusIcon(application.status)}
                                                            <Chip
                                                                label={getStatusLabel(application.status)}
                                                                color={getStatusColor(application.status)}
                                                                sx={{ fontWeight: 600 }}
                                                            />
                                                        </Box>

                                                        <Typography variant="caption" color="text.secondary">
                                                            Candidatura enviada em {new Date(application.applied_at).toLocaleDateString('pt-BR')}
                                                        </Typography>

                                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                                            {application.job && (
                                                                <Button
                                                                    variant="outlined"
                                                                    size="small"
                                                                    onClick={() => router.push(`/vagas/${application.job_id}`)}
                                                                >
                                                                    Ver Vaga
                                                                </Button>
                                                            )}

                                                            {application.status === 'pending' && (
                                                                <Button
                                                                    variant="outlined"
                                                                    size="small"
                                                                    color="error"
                                                                    onClick={() => handleCancel(application.id)}
                                                                >
                                                                    Cancelar
                                                                </Button>
                                                            )}
                                                        </Box>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    )}
                </>
            )}
        </Container>
    );
}

export default function DashboardPage() {
    return (
        <ProtectedRoute allowedRoles={['professional']}>
            <DashboardContent />
        </ProtectedRoute>
    );
}

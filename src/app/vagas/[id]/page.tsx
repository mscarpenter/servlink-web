'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    Container,
    Box,
    Typography,
    Paper,
    Grid,
    Chip,
    Button,
    Avatar,
    Divider,
    CircularProgress,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import {
    LocationOn,
    AccessTime,
    AttachMoney,
    People,
    Star,
    CalendarToday,
    ArrowBack,
    CheckCircle,
} from '@mui/icons-material';
import { useJobsStore } from '@/stores/jobsStore';
import { useApplicationsStore } from '@/stores/applicationsStore';
import { useAuthStore } from '@/stores/authStore';

const MAR_PROFUNDO = '#003366';

export default function JobDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const jobId = parseInt(params.id as string);

    const { user } = useAuthStore();
    const { currentJob, isLoading, error, fetchJobById, clearError } = useJobsStore();
    const { createApplication, isLoading: isApplying } = useApplicationsStore();

    const [openDialog, setOpenDialog] = useState(false);
    const [applicationSuccess, setApplicationSuccess] = useState(false);

    useEffect(() => {
        if (jobId) {
            fetchJobById(jobId);
        }
    }, [jobId, fetchJobById]);

    const handleApply = async () => {
        try {
            await createApplication({ job_id: jobId });
            setApplicationSuccess(true);
            setOpenDialog(false);
        } catch (error) {
            console.error('Erro ao candidatar:', error);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    const formatTime = (timeString: string) => {
        return timeString.substring(0, 5);
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error || !currentJob) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Alert severity="error">{error || 'Vaga não encontrada'}</Alert>
                <Button startIcon={<ArrowBack />} onClick={() => router.push('/vagas')} sx={{ mt: 2 }}>
                    Voltar para vagas
                </Button>
            </Container>
        );
    }

    const slotsRemaining = currentJob.slots_available - currentJob.slots_filled;
    const isProfessional = user?.role === 'professional';
    const canApply = isProfessional && currentJob.status === 'open' && slotsRemaining > 0;

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Back Button */}
            <Button
                startIcon={<ArrowBack />}
                onClick={() => router.push('/vagas')}
                sx={{ mb: 3 }}
            >
                Voltar para vagas
            </Button>

            {/* Success Alert */}
            {applicationSuccess && (
                <Alert
                    severity="success"
                    sx={{ mb: 3 }}
                    icon={<CheckCircle />}
                >
                    Candidatura enviada com sucesso! Acompanhe o status no seu dashboard.
                </Alert>
            )}

            <Grid container spacing={4}>
                {/* Main Content */}
                <Grid item xs={12} md={8}>
                    <Paper elevation={3} sx={{ p: 4 }}>
                        {/* Header */}
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <Avatar
                                src={currentJob.establishment?.logo_url}
                                sx={{ width: 64, height: 64, mr: 2, bgcolor: MAR_PROFUNDO }}
                            >
                                {currentJob.establishment?.company_name?.charAt(0)}
                            </Avatar>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                                    {currentJob.title}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                    {currentJob.establishment?.company_name}
                                </Typography>
                                {currentJob.establishment?.average_rating && (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                                        <Star sx={{ fontSize: 18, color: '#FFD700' }} />
                                        <Typography variant="body2">
                                            {currentJob.establishment.average_rating.toFixed(1)} • Avaliação do estabelecimento
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                            <Chip
                                label={currentJob.category}
                                sx={{
                                    bgcolor: MAR_PROFUNDO,
                                    color: 'white',
                                    fontWeight: 600
                                }}
                            />
                        </Box>

                        <Divider sx={{ my: 3 }} />

                        {/* Description */}
                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                Descrição da Vaga
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                                {currentJob.description}
                            </Typography>
                        </Box>

                        {/* Requirements */}
                        {currentJob.requirements && (
                            <Box sx={{ mb: 4 }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                    Requisitos
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                                    {currentJob.requirements}
                                </Typography>
                            </Box>
                        )}

                        {/* Job Details */}
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                Detalhes
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                        <CalendarToday sx={{ color: 'text.secondary' }} />
                                        <Box>
                                            <Typography variant="caption" color="text.secondary">
                                                Data
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                {formatDate(currentJob.date)}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                        <AccessTime sx={{ color: 'text.secondary' }} />
                                        <Box>
                                            <Typography variant="caption" color="text.secondary">
                                                Horário
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                {formatTime(currentJob.start_time)} - {formatTime(currentJob.end_time)}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                        <LocationOn sx={{ color: 'text.secondary' }} />
                                        <Box>
                                            <Typography variant="caption" color="text.secondary">
                                                Localização
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                {currentJob.location}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                        <People sx={{ color: 'text.secondary' }} />
                                        <Box>
                                            <Typography variant="caption" color="text.secondary">
                                                Vagas Disponíveis
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                {slotsRemaining} de {currentJob.slots_available}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>

                {/* Sidebar */}
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 3, position: 'sticky', top: 24 }}>
                        <Box sx={{ textAlign: 'center', mb: 3 }}>
                            <AttachMoney sx={{ fontSize: 48, color: MAR_PROFUNDO, mb: 1 }} />
                            <Typography variant="h4" sx={{ fontWeight: 700, color: MAR_PROFUNDO }}>
                                R$ {currentJob.rate.toFixed(2)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {currentJob.rate_type === 'Hourly' ? 'por hora' : 'valor fixo'}
                            </Typography>
                        </Box>

                        <Divider sx={{ my: 3 }} />

                        {/* Status */}
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="caption" color="text.secondary">
                                Status
                            </Typography>
                            <Chip
                                label={
                                    currentJob.status === 'open' ? 'Aberta' :
                                        currentJob.status === 'closed' ? 'Fechada' : 'Cancelada'
                                }
                                color={currentJob.status === 'open' ? 'success' : 'default'}
                                sx={{ mt: 1, width: '100%' }}
                            />
                        </Box>

                        {/* Apply Button */}
                        {canApply && (
                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                onClick={() => setOpenDialog(true)}
                                disabled={isApplying || applicationSuccess}
                                sx={{
                                    bgcolor: MAR_PROFUNDO,
                                    '&:hover': { bgcolor: '#002A3C' },
                                    py: 1.5,
                                }}
                            >
                                {applicationSuccess ? 'Candidatura Enviada' : 'Candidatar-se'}
                            </Button>
                        )}

                        {!isProfessional && (
                            <Alert severity="info" sx={{ mt: 2 }}>
                                Apenas profissionais podem se candidatar
                            </Alert>
                        )}

                        {currentJob.status !== 'open' && (
                            <Alert severity="warning" sx={{ mt: 2 }}>
                                Esta vaga não está mais disponível
                            </Alert>
                        )}
                    </Paper>
                </Grid>
            </Grid>

            {/* Confirmation Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Confirmar Candidatura</DialogTitle>
                <DialogContent>
                    <Typography>
                        Deseja confirmar sua candidatura para a vaga de <strong>{currentJob.title}</strong>?
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                        O estabelecimento será notificado e você poderá acompanhar o status da sua candidatura no dashboard.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleApply}
                        variant="contained"
                        disabled={isApplying}
                        sx={{ bgcolor: MAR_PROFUNDO }}
                    >
                        {isApplying ? <CircularProgress size={24} /> : 'Confirmar'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
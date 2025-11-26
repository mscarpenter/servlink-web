'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    Container,
    Box,
    Typography,
    Paper,
    Grid,
    Button,
    Avatar,
    Chip,
    CircularProgress,
    Alert,
    Divider,
} from '@mui/material';
import {
    ArrowBack,
    CheckCircle,
    Cancel,
    Star,
    Person,
} from '@mui/icons-material';
import { useJobsStore } from '@/stores/jobsStore';
import { useApplicationsStore } from '@/stores/applicationsStore';
import ProtectedRoute from '@/components/ProtectedRoute';

const MAR_PROFUNDO = '#003366';

function CandidatesContent() {
    const params = useParams();
    const router = useRouter();
    const jobId = parseInt(params.id as string);

    const { currentJob, isLoading: jobLoading, fetchJobById } = useJobsStore();
    const { applications, isLoading: appsLoading, error, fetchApplications, approveApplication, rejectApplication, clearError } = useApplicationsStore();

    useEffect(() => {
        if (jobId) {
            fetchJobById(jobId);
            fetchApplications(jobId);
        }
    }, [jobId, fetchJobById, fetchApplications]);

    const handleApprove = async (applicationId: number) => {
        try {
            await approveApplication(applicationId);
        } catch (error) {
            console.error('Erro ao aprovar:', error);
        }
    };

    const handleReject = async (applicationId: number) => {
        try {
            await rejectApplication(applicationId);
        } catch (error) {
            console.error('Erro ao rejeitar:', error);
        }
    };

    const pendingApplications = applications.filter(app => app.status === 'pending');
    const approvedApplications = applications.filter(app => app.status === 'approved');
    const rejectedApplications = applications.filter(app => app.status === 'rejected');

    if (jobLoading || appsLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!currentJob) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Alert severity="error">Vaga não encontrada</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Back Button */}
            <Button
                startIcon={<ArrowBack />}
                onClick={() => router.push('/estabelecimento')}
                sx={{ mb: 3 }}
            >
                Voltar para Dashboard
            </Button>

            {/* Job Info */}
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                    {currentJob.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {currentJob.category} • {currentJob.location}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                    <Chip label={`${currentJob.slots_filled}/${currentJob.slots_available} vagas preenchidas`} />
                    <Chip label={`${pendingApplications.length} pendentes`} color="warning" />
                    <Chip label={`${approvedApplications.length} aprovados`} color="success" />
                </Box>
            </Paper>

            {/* Error Alert */}
            {error && (
                <Alert severity="error" sx={{ mb: 3 }} onClose={clearError}>
                    {error}
                </Alert>
            )}

            {/* Candidates List */}
            <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                    Candidatos ({applications.length})
                </Typography>

                {applications.length === 0 ? (
                    <Paper elevation={2} sx={{ p: 6, textAlign: 'center' }}>
                        <Person sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary">
                            Nenhum candidato ainda
                        </Typography>
                    </Paper>
                ) : (
                    <Grid container spacing={3}>
                        {/* Pending Applications */}
                        {pendingApplications.length > 0 && (
                            <>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'warning.main' }}>
                                        Pendentes ({pendingApplications.length})
                                    </Typography>
                                    <Divider sx={{ mt: 1, mb: 2 }} />
                                </Grid>
                                {pendingApplications.map((application) => (
                                    <Grid item xs={12} md={6} key={application.id}>
                                        <Paper elevation={2} sx={{ p: 3 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                <Avatar
                                                    src={application.professional?.photo_url}
                                                    sx={{ width: 56, height: 56, mr: 2, bgcolor: MAR_PROFUNDO }}
                                                >
                                                    {application.professional?.full_name?.charAt(0)}
                                                </Avatar>
                                                <Box sx={{ flexGrow: 1 }}>
                                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                        {application.professional?.full_name}
                                                    </Typography>
                                                    {application.professional?.overall_rating && (
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                            <Star sx={{ fontSize: 16, color: '#FFD700' }} />
                                                            <Typography variant="body2">
                                                                {application.professional.overall_rating.toFixed(1)}
                                                            </Typography>
                                                        </Box>
                                                    )}
                                                </Box>
                                            </Box>

                                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                                                Candidatura enviada em {new Date(application.applied_at).toLocaleDateString('pt-BR')}
                                            </Typography>

                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <Button
                                                    fullWidth
                                                    variant="contained"
                                                    color="success"
                                                    startIcon={<CheckCircle />}
                                                    onClick={() => handleApprove(application.id)}
                                                >
                                                    Aprovar
                                                </Button>
                                                <Button
                                                    fullWidth
                                                    variant="outlined"
                                                    color="error"
                                                    startIcon={<Cancel />}
                                                    onClick={() => handleReject(application.id)}
                                                >
                                                    Rejeitar
                                                </Button>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                ))}
                            </>
                        )}

                        {/* Approved Applications */}
                        {approvedApplications.length > 0 && (
                            <>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'success.main', mt: 2 }}>
                                        Aprovados ({approvedApplications.length})
                                    </Typography>
                                    <Divider sx={{ mt: 1, mb: 2 }} />
                                </Grid>
                                {approvedApplications.map((application) => (
                                    <Grid item xs={12} md={6} key={application.id}>
                                        <Paper elevation={2} sx={{ p: 3, borderLeft: '4px solid', borderColor: 'success.main' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                <Avatar
                                                    src={application.professional?.photo_url}
                                                    sx={{ width: 56, height: 56, mr: 2, bgcolor: MAR_PROFUNDO }}
                                                >
                                                    {application.professional?.full_name?.charAt(0)}
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                        {application.professional?.full_name}
                                                    </Typography>
                                                    <Chip label="Aprovado" color="success" size="small" />
                                                </Box>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                ))}
                            </>
                        )}

                        {/* Rejected Applications */}
                        {rejectedApplications.length > 0 && (
                            <>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'error.main', mt: 2 }}>
                                        Rejeitados ({rejectedApplications.length})
                                    </Typography>
                                    <Divider sx={{ mt: 1, mb: 2 }} />
                                </Grid>
                                {rejectedApplications.map((application) => (
                                    <Grid item xs={12} md={6} key={application.id}>
                                        <Paper elevation={2} sx={{ p: 3, opacity: 0.7 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Avatar
                                                    src={application.professional?.photo_url}
                                                    sx={{ width: 56, height: 56, mr: 2, bgcolor: 'grey.400' }}
                                                >
                                                    {application.professional?.full_name?.charAt(0)}
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                        {application.professional?.full_name}
                                                    </Typography>
                                                    <Chip label="Rejeitado" color="error" size="small" />
                                                </Box>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                ))}
                            </>
                        )}
                    </Grid>
                )}
            </Box>
        </Container>
    );
}

export default function CandidatesPage() {
    return (
        <ProtectedRoute allowedRoles={['establishment']}>
            <CandidatesContent />
        </ProtectedRoute>
    );
}

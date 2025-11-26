'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Container,
    Box,
    Typography,
    Paper,
    Grid,
    Button,
    Tabs,
    Tab,
    CircularProgress,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
} from '@mui/material';
import {
    Add,
    Work,
    People,
    CheckCircle,
    HourglassEmpty,
} from '@mui/icons-material';
import { useJobsStore } from '@/stores/jobsStore';
import { useApplicationsStore } from '@/stores/applicationsStore';
import { useAuthStore } from '@/stores/authStore';
import ProtectedRoute from '@/components/ProtectedRoute';
import JobCard from '@/components/JobCard';
import type { CreateJobData } from '@/lib/api/jobs';

const MAR_PROFUNDO = '#003366';

const CATEGORIES = ['Bartender', 'Garçom', 'Cozinheiro', 'Auxiliar de Cozinha', 'Recepcionista'];

function EstablishmentDashboardContent() {
    const router = useRouter();
    const { user } = useAuthStore();
    const { jobs, isLoading: jobsLoading, error: jobsError, fetchJobs, createJob, deleteJob, clearError: clearJobsError } = useJobsStore();
    const { applications, isLoading: appsLoading, fetchApplications } = useApplicationsStore();

    const [currentTab, setCurrentTab] = useState(0);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [formData, setFormData] = useState<CreateJobData>({
        title: '',
        description: '',
        category: 'Bartender',
        rate: 0,
        rate_type: 'Hourly',
        location: '',
        date: '',
        start_time: '',
        end_time: '',
        slots_available: 1,
        requirements: '',
    });

    useEffect(() => {
        fetchJobs({ my_jobs: true } as any);
        fetchApplications();
    }, [fetchJobs, fetchApplications]);

    const handleCreateJob = async () => {
        try {
            await createJob(formData);
            setOpenCreateDialog(false);
            // Reset form
            setFormData({
                title: '',
                description: '',
                category: 'Bartender',
                rate: 0,
                rate_type: 'Hourly',
                location: '',
                date: '',
                start_time: '',
                end_time: '',
                slots_available: 1,
                requirements: '',
            });
        } catch (error) {
            console.error('Erro ao criar vaga:', error);
        }
    };

    const handleDeleteJob = async (jobId: number) => {
        if (confirm('Deseja realmente deletar esta vaga?')) {
            try {
                await deleteJob(jobId);
            } catch (error) {
                console.error('Erro ao deletar:', error);
            }
        }
    };

    const handleViewCandidates = (jobId: number) => {
        router.push(`/estabelecimento/vagas/${jobId}/candidatos`);
    };

    const myJobs = jobs.filter(job => job.establishment_user_id === user?.id);
    const openJobs = myJobs.filter(job => job.status === 'open');
    const totalApplications = applications.length;
    const pendingApplications = applications.filter(app => app.status === 'pending').length;

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: MAR_PROFUNDO, mb: 1 }}>
                        Dashboard do Estabelecimento
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Bem-vindo, {user?.name}!
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => setOpenCreateDialog(true)}
                    sx={{ bgcolor: MAR_PROFUNDO, '&:hover': { bgcolor: '#002A3C' } }}
                >
                    Nova Vaga
                </Button>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
                        <Work sx={{ fontSize: 40, color: MAR_PROFUNDO, mb: 1 }} />
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                            {myJobs.length}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Total de Vagas
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
                        <CheckCircle sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                            {openJobs.length}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Vagas Abertas
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
                        <People sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                            {totalApplications}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Total de Candidatos
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
                        <HourglassEmpty sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                            {pendingApplications}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Pendentes
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* Tabs */}
            <Paper elevation={2} sx={{ mb: 3 }}>
                <Tabs value={currentTab} onChange={(e, v) => setCurrentTab(v)}>
                    <Tab label="Minhas Vagas" />
                    <Tab label="Candidatos Pendentes" />
                </Tabs>
            </Paper>

            {/* Error Alert */}
            {jobsError && (
                <Alert severity="error" sx={{ mb: 3 }} onClose={clearJobsError}>
                    {jobsError}
                </Alert>
            )}

            {/* Loading */}
            {(jobsLoading || appsLoading) && (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                    <CircularProgress />
                </Box>
            )}

            {/* Content */}
            {!jobsLoading && !appsLoading && (
                <>
                    {currentTab === 0 && (
                        <Box>
                            {myJobs.length === 0 ? (
                                <Paper elevation={2} sx={{ p: 6, textAlign: 'center' }}>
                                    <Work sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                                    <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                                        Nenhuma vaga criada ainda
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                        Crie sua primeira vaga para começar a receber candidatos
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        startIcon={<Add />}
                                        onClick={() => setOpenCreateDialog(true)}
                                        sx={{ bgcolor: MAR_PROFUNDO }}
                                    >
                                        Criar Primeira Vaga
                                    </Button>
                                </Paper>
                            ) : (
                                <Grid container spacing={3}>
                                    {myJobs.map((job) => (
                                        <Grid item xs={12} sm={6} md={4} key={job.id}>
                                            <JobCard
                                                job={job}
                                                showActions={false}
                                                onViewDetails={() => router.push(`/vagas/${job.id}`)}
                                            />
                                            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                                                <Button
                                                    fullWidth
                                                    variant="outlined"
                                                    size="small"
                                                    onClick={() => handleViewCandidates(job.id)}
                                                >
                                                    Ver Candidatos ({job.slots_filled})
                                                </Button>
                                                <Button
                                                    fullWidth
                                                    variant="outlined"
                                                    size="small"
                                                    color="error"
                                                    onClick={() => handleDeleteJob(job.id)}
                                                >
                                                    Deletar
                                                </Button>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            )}
                        </Box>
                    )}

                    {currentTab === 1 && (
                        <Box>
                            {pendingApplications === 0 ? (
                                <Paper elevation={2} sx={{ p: 6, textAlign: 'center' }}>
                                    <People sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                                    <Typography variant="h6" color="text.secondary">
                                        Nenhum candidato pendente
                                    </Typography>
                                </Paper>
                            ) : (
                                <Typography>Lista de candidatos pendentes (implementar)</Typography>
                            )}
                        </Box>
                    )}
                </>
            )}

            {/* Create Job Dialog */}
            <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} maxWidth="md" fullWidth>
                <DialogTitle>Criar Nova Vaga</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Título da Vaga"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Descrição"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                multiline
                                rows={3}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                select
                                label="Categoria"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                {CATEGORIES.map((cat) => (
                                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Localização"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Valor (R$)"
                                value={formData.rate}
                                onChange={(e) => setFormData({ ...formData, rate: parseFloat(e.target.value) })}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                select
                                label="Tipo"
                                value={formData.rate_type}
                                onChange={(e) => setFormData({ ...formData, rate_type: e.target.value as 'Hourly' | 'Fixed' })}
                            >
                                <MenuItem value="Hourly">Por Hora</MenuItem>
                                <MenuItem value="Fixed">Fixo</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Vagas Disponíveis"
                                value={formData.slots_available}
                                onChange={(e) => setFormData({ ...formData, slots_available: parseInt(e.target.value) })}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                type="date"
                                label="Data"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                InputLabelProps={{ shrink: true }}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                type="time"
                                label="Horário Início"
                                value={formData.start_time}
                                onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                                InputLabelProps={{ shrink: true }}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                type="time"
                                label="Horário Fim"
                                value={formData.end_time}
                                onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                                InputLabelProps={{ shrink: true }}
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Requisitos (opcional)"
                                value={formData.requirements}
                                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                                multiline
                                rows={2}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenCreateDialog(false)}>
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleCreateJob}
                        variant="contained"
                        sx={{ bgcolor: MAR_PROFUNDO }}
                    >
                        Criar Vaga
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default function EstablishmentDashboardPage() {
    return (
        <ProtectedRoute allowedRoles={['establishment']}>
            <EstablishmentDashboardContent />
        </ProtectedRoute>
    );
}

'use client';

import { useEffect, useState } from 'react';
import {
    Container,
    Box,
    Typography,
    Grid,
    Paper,
    Tabs,
    Tab,
    CircularProgress,
    Alert,
    Button,
} from '@mui/material';
import {
    Schedule,
    CheckCircle,
    HourglassEmpty,
    PlayArrow,
} from '@mui/icons-material';
import { useShiftsStore } from '@/stores/shiftsStore';
import { useAuthStore } from '@/stores/authStore';
import ProtectedRoute from '@/components/ProtectedRoute';
import ShiftCard from '@/components/ShiftCard';

const MAR_PROFUNDO = '#003366';

function ShiftsContent() {
    const { user } = useAuthStore();
    const { shifts, isLoading, error, fetchShifts, checkIn, checkOut, clearError } = useShiftsStore();

    const [currentTab, setCurrentTab] = useState(0);

    useEffect(() => {
        fetchShifts();
    }, [fetchShifts]);

    const handleCheckIn = async (shiftId: number) => {
        try {
            await checkIn(shiftId);
        } catch (error) {
            console.error('Erro no check-in:', error);
        }
    };

    const handleCheckOut = async (shiftId: number) => {
        if (confirm('Deseja realmente fazer check-out? O horário será registrado.')) {
            try {
                await checkOut(shiftId);
            } catch (error) {
                console.error('Erro no check-out:', error);
            }
        }
    };

    const scheduledShifts = shifts.filter(s => s.status === 'scheduled');
    const inProgressShifts = shifts.filter(s => s.status === 'in_progress');
    const completedShifts = shifts.filter(s => s.status === 'completed');

    const totalHours = completedShifts.reduce((sum, shift) => sum + (shift.confirmed_hours || 0), 0);
    const totalEarnings = completedShifts.reduce((sum, shift) => {
        const hours = shift.confirmed_hours || 0;
        const rate = shift.job?.rate || 0;
        return sum + (shift.job?.rate_type === 'Hourly' ? hours * rate : rate);
    }, 0);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: MAR_PROFUNDO, mb: 1 }}>
                    Meus Turnos
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Gerencie seus turnos de trabalho
                </Typography>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
                        <HourglassEmpty sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                            {scheduledShifts.length}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Agendados
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
                        <PlayArrow sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                            {inProgressShifts.length}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Em Andamento
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
                        <CheckCircle sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                            {completedShifts.length}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Concluídos
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
                        <Schedule sx={{ fontSize: 40, color: MAR_PROFUNDO, mb: 1 }} />
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                            {totalHours.toFixed(1)}h
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Total Trabalhado
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* Earnings Card */}
            {completedShifts.length > 0 && (
                <Paper elevation={3} sx={{ p: 3, mb: 4, bgcolor: MAR_PROFUNDO, color: 'white' }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        Total Ganho
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 700 }}>
                        R$ {totalEarnings.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Baseado em {completedShifts.length} {completedShifts.length === 1 ? 'turno concluído' : 'turnos concluídos'}
                    </Typography>
                </Paper>
            )}

            {/* Tabs */}
            <Paper elevation={2} sx={{ mb: 3 }}>
                <Tabs value={currentTab} onChange={(e, v) => setCurrentTab(v)}>
                    <Tab label={`Agendados (${scheduledShifts.length})`} />
                    <Tab label={`Em Andamento (${inProgressShifts.length})`} />
                    <Tab label={`Concluídos (${completedShifts.length})`} />
                </Tabs>
            </Paper>

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

            {/* Content */}
            {!isLoading && (
                <>
                    {currentTab === 0 && (
                        <Box>
                            {scheduledShifts.length === 0 ? (
                                <Paper elevation={2} sx={{ p: 6, textAlign: 'center' }}>
                                    <HourglassEmpty sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                                    <Typography variant="h6" color="text.secondary">
                                        Nenhum turno agendado
                                    </Typography>
                                </Paper>
                            ) : (
                                <Grid container spacing={3}>
                                    {scheduledShifts.map((shift) => (
                                        <Grid item xs={12} md={6} lg={4} key={shift.id}>
                                            <ShiftCard
                                                shift={shift}
                                                onCheckIn={handleCheckIn}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            )}
                        </Box>
                    )}

                    {currentTab === 1 && (
                        <Box>
                            {inProgressShifts.length === 0 ? (
                                <Paper elevation={2} sx={{ p: 6, textAlign: 'center' }}>
                                    <PlayArrow sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                                    <Typography variant="h6" color="text.secondary">
                                        Nenhum turno em andamento
                                    </Typography>
                                </Paper>
                            ) : (
                                <Grid container spacing={3}>
                                    {inProgressShifts.map((shift) => (
                                        <Grid item xs={12} md={6} lg={4} key={shift.id}>
                                            <ShiftCard
                                                shift={shift}
                                                onCheckOut={handleCheckOut}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            )}
                        </Box>
                    )}

                    {currentTab === 2 && (
                        <Box>
                            {completedShifts.length === 0 ? (
                                <Paper elevation={2} sx={{ p: 6, textAlign: 'center' }}>
                                    <CheckCircle sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                                    <Typography variant="h6" color="text.secondary">
                                        Nenhum turno concluído ainda
                                    </Typography>
                                </Paper>
                            ) : (
                                <Grid container spacing={3}>
                                    {completedShifts.map((shift) => (
                                        <Grid item xs={12} md={6} lg={4} key={shift.id}>
                                            <ShiftCard
                                                shift={shift}
                                                showActions={false}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            )}
                        </Box>
                    )}
                </>
            )}
        </Container>
    );
}

export default function ShiftsPage() {
    return (
        <ProtectedRoute allowedRoles={['professional']}>
            <ShiftsContent />
        </ProtectedRoute>
    );
}

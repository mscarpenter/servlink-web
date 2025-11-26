'use client';

import { useEffect, useState } from 'react';
import {
    Container,
    Box,
    Typography,
    Grid,
    Paper,
    Chip,
    CircularProgress,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from '@mui/material';
import {
    AttachMoney,
    CheckCircle,
    HourglassEmpty,
    TrendingUp,
} from '@mui/icons-material';
import { usePaymentsStore } from '@/stores/paymentsStore';
import { useAuthStore } from '@/stores/authStore';
import ProtectedRoute from '@/components/ProtectedRoute';

const MAR_PROFUNDO = '#003366';

function PaymentsContent() {
    const { user } = useAuthStore();
    const { payments, isLoading, error, fetchPayments, clearError } = usePaymentsStore();

    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        fetchPayments();
    }, [fetchPayments]);

    const getStatusColor = (status: string): 'warning' | 'success' | 'info' | 'error' => {
        switch (status) {
            case 'pending':
                return 'warning';
            case 'processed':
            case 'paid':
                return 'success';
            case 'failed':
                return 'error';
            default:
                return 'info';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'pending':
                return 'Pendente';
            case 'processed':
                return 'Processado';
            case 'paid':
                return 'Pago';
            case 'failed':
                return 'Falhou';
            default:
                return status;
        }
    };

    const filteredPayments = statusFilter === 'all'
        ? payments
        : payments.filter(p => p.status === statusFilter);

    const pendingPayments = payments.filter(p => p.status === 'pending');
    const processedPayments = payments.filter(p => p.status === 'processed' || p.status === 'paid');
    const totalAmount = processedPayments.reduce((sum, p) => sum + p.net_amount, 0);
    const totalCommission = processedPayments.reduce((sum, p) => sum + p.commission, 0);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: MAR_PROFUNDO, mb: 1 }}>
                    Meus Pagamentos
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Histórico financeiro e pagamentos
                </Typography>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
                        <AttachMoney sx={{ fontSize: 40, color: MAR_PROFUNDO, mb: 1 }} />
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                            {payments.length}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Total de Pagamentos
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
                        <HourglassEmpty sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                            {pendingPayments.length}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Pendentes
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
                        <CheckCircle sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                            {processedPayments.length}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Processados
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
                        <TrendingUp sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                            R$ {totalAmount.toFixed(2)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Total Recebido
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* Commission Info */}
            {totalCommission > 0 && (
                <Paper elevation={2} sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        Informações de Comissão
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                                Total de Comissão (18%):
                            </Typography>
                            <Typography variant="h6" color="error.main">
                                R$ {totalCommission.toFixed(2)}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                                Valor Bruto Total:
                            </Typography>
                            <Typography variant="h6">
                                R$ {(totalAmount + totalCommission).toFixed(2)}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            )}

            {/* Filter */}
            <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>Filtrar por Status</InputLabel>
                    <Select
                        value={statusFilter}
                        label="Filtrar por Status"
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <MenuItem value="all">Todos</MenuItem>
                        <MenuItem value="pending">Pendentes</MenuItem>
                        <MenuItem value="processed">Processados</MenuItem>
                        <MenuItem value="paid">Pagos</MenuItem>
                        <MenuItem value="failed">Falhados</MenuItem>
                    </Select>
                </FormControl>
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

            {/* Payments Table */}
            {!isLoading && (
                <>
                    {filteredPayments.length === 0 ? (
                        <Paper elevation={2} sx={{ p: 6, textAlign: 'center' }}>
                            <AttachMoney sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                            <Typography variant="h6" color="text.secondary">
                                Nenhum pagamento encontrado
                            </Typography>
                        </Paper>
                    ) : (
                        <TableContainer component={Paper} elevation={2}>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ bgcolor: 'grey.50' }}>
                                        <TableCell><strong>Data</strong></TableCell>
                                        <TableCell><strong>Vaga</strong></TableCell>
                                        <TableCell align="right"><strong>Valor Bruto</strong></TableCell>
                                        <TableCell align="right"><strong>Comissão</strong></TableCell>
                                        <TableCell align="right"><strong>Valor Líquido</strong></TableCell>
                                        <TableCell align="center"><strong>Status</strong></TableCell>
                                        <TableCell><strong>ID Transação</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredPayments.map((payment) => (
                                        <TableRow key={payment.id} hover>
                                            <TableCell>
                                                {new Date(payment.created_at).toLocaleDateString('pt-BR')}
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                    {payment.shift?.job?.title}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {payment.shift?.job?.category}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                R$ {payment.amount.toFixed(2)}
                                            </TableCell>
                                            <TableCell align="right" sx={{ color: 'error.main' }}>
                                                R$ {payment.commission.toFixed(2)}
                                            </TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 600, color: 'success.main' }}>
                                                R$ {payment.net_amount.toFixed(2)}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Chip
                                                    label={getStatusLabel(payment.status)}
                                                    color={getStatusColor(payment.status)}
                                                    size="small"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                                                    {payment.transaction_id || '-'}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </>
            )}
        </Container>
    );
}

export default function PaymentsPage() {
    return (
        <ProtectedRoute allowedRoles={['professional']}>
            <PaymentsContent />
        </ProtectedRoute>
    );
}

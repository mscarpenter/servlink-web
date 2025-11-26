import { Card, CardContent, Typography, Box, Chip, Button, Divider } from '@mui/material';
import { AccessTime, LocationOn, AttachMoney, CheckCircle, PlayArrow, Stop } from '@mui/icons-material';
import type { Shift } from '@/lib/api/shifts';

interface ShiftCardProps {
    shift: Shift;
    onCheckIn?: (shiftId: number) => void;
    onCheckOut?: (shiftId: number) => void;
    showActions?: boolean;
}

const MAR_PROFUNDO = '#003366';

export default function ShiftCard({ shift, onCheckIn, onCheckOut, showActions = true }: ShiftCardProps) {
    const formatDateTime = (dateTimeString: string) => {
        const date = new Date(dateTimeString);
        return {
            date: date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
            time: date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        };
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'scheduled':
                return 'info';
            case 'in_progress':
                return 'warning';
            case 'completed':
                return 'success';
            case 'cancelled':
                return 'error';
            default:
                return 'default';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'scheduled':
                return 'Agendado';
            case 'in_progress':
                return 'Em Andamento';
            case 'completed':
                return 'Concluído';
            case 'cancelled':
                return 'Cancelado';
            default:
                return status;
        }
    };

    const scheduledStart = formatDateTime(shift.scheduled_start);
    const scheduledEnd = formatDateTime(shift.scheduled_end);
    const canCheckIn = shift.status === 'scheduled';
    const canCheckOut = shift.status === 'in_progress';

    return (
        <Card
            elevation={2}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderLeft: `4px solid`,
                borderColor: shift.status === 'in_progress' ? 'warning.main' :
                    shift.status === 'completed' ? 'success.main' : 'info.main',
            }}
        >
            <CardContent sx={{ flexGrow: 1 }}>
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                            {shift.job?.title}
                        </Typography>
                        <Chip
                            label={shift.job?.category}
                            size="small"
                            sx={{ bgcolor: MAR_PROFUNDO, color: 'white' }}
                        />
                    </Box>
                    <Chip
                        label={getStatusLabel(shift.status)}
                        color={getStatusColor(shift.status) as any}
                        size="small"
                    />
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Info */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationOn sx={{ fontSize: 18, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                            {shift.job?.location}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AccessTime sx={{ fontSize: 18, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                            {scheduledStart.date} • {scheduledStart.time} - {scheduledEnd.time}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AttachMoney sx={{ fontSize: 18, color: 'text.secondary' }} />
                        <Typography variant="body2" fontWeight={600} color={MAR_PROFUNDO}>
                            R$ {shift.job?.rate.toFixed(2)} {shift.job?.rate_type === 'Hourly' ? '/hora' : 'fixo'}
                        </Typography>
                    </Box>

                    {shift.confirmed_hours && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CheckCircle sx={{ fontSize: 18, color: 'success.main' }} />
                            <Typography variant="body2" color="text.secondary">
                                {shift.confirmed_hours}h trabalhadas
                            </Typography>
                        </Box>
                    )}
                </Box>

                {/* Actual Times */}
                {(shift.actual_start || shift.actual_end) && (
                    <Box sx={{ mt: 2, p: 1.5, bgcolor: 'grey.50', borderRadius: 1 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                            Horários Reais:
                        </Typography>
                        {shift.actual_start && (
                            <Typography variant="body2">
                                Início: {formatDateTime(shift.actual_start).time}
                            </Typography>
                        )}
                        {shift.actual_end && (
                            <Typography variant="body2">
                                Fim: {formatDateTime(shift.actual_end).time}
                            </Typography>
                        )}
                    </Box>
                )}
            </CardContent>

            {/* Actions */}
            {showActions && (canCheckIn || canCheckOut) && (
                <Box sx={{ p: 2, pt: 0 }}>
                    {canCheckIn && onCheckIn && (
                        <Button
                            fullWidth
                            variant="contained"
                            startIcon={<PlayArrow />}
                            onClick={() => onCheckIn(shift.id)}
                            sx={{ bgcolor: 'success.main', '&:hover': { bgcolor: 'success.dark' } }}
                        >
                            Fazer Check-in
                        </Button>
                    )}
                    {canCheckOut && onCheckOut && (
                        <Button
                            fullWidth
                            variant="contained"
                            startIcon={<Stop />}
                            onClick={() => onCheckOut(shift.id)}
                            sx={{ bgcolor: 'warning.main', '&:hover': { bgcolor: 'warning.dark' } }}
                        >
                            Fazer Check-out
                        </Button>
                    )}
                </Box>
            )}
        </Card>
    );
}

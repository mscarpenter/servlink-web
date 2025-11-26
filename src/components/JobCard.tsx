import { Card, CardContent, Typography, Chip, Box, Button, Avatar } from '@mui/material';
import { LocationOn, AccessTime, AttachMoney, People, Star } from '@mui/icons-material';
import type { Job } from '@/lib/api/jobs';

interface JobCardProps {
    job: Job;
    onApply?: (jobId: number) => void;
    onViewDetails?: (jobId: number) => void;
    showActions?: boolean;
}

const MAR_PROFUNDO = '#003366';

export default function JobCard({ job, onApply, onViewDetails, showActions = true }: JobCardProps) {
    const formatDate = (dateString: string) => {
        if (!dateString) return 'Data a definir';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Data inválida';
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
    };

    const formatTime = (timeString: string) => {
        if (!timeString) return '--:--';
        return timeString.substring(0, 5); // HH:MM
    };

    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            'Bartender': '#FF6B6B',
            'Garçom': '#4ECDC4',
            'Cozinheiro': '#FFD93D',
            'Auxiliar de Cozinha': '#95E1D3',
            'Recepcionista': '#A8E6CF',
        };
        return colors[category] || '#6C757D';
    };

    const slotsAvailable = Number(job.slots_available) || 0;
    const slotsFilled = Number(job.slots_filled) || 0;
    const slotsRemaining = Math.max(0, slotsAvailable - slotsFilled);

    return (
        <Card
            elevation={2}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                '&:hover': {
                    elevation: 6,
                    transform: 'translateY(-4px)',
                }
            }}
        >
            <CardContent sx={{ flexGrow: 1 }}>
                {/* Header com Logo e Rating */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                        src={job.establishment?.logo_url}
                        sx={{ width: 48, height: 48, mr: 2, bgcolor: MAR_PROFUNDO }}
                    >
                        {job.establishment?.company_name?.charAt(0)}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                            {job.establishment?.company_name}
                        </Typography>
                        {job.establishment?.average_rating != null && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Star sx={{ fontSize: 16, color: '#FFD700' }} />
                                <Typography variant="caption">
                                    {Number(job.establishment.average_rating).toFixed(1)}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                    <Chip
                        label={job.category}
                        size="small"
                        sx={{
                            bgcolor: getCategoryColor(job.category),
                            color: 'white',
                            fontWeight: 600
                        }}
                    />
                </Box>

                {/* Título */}
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {job.title}
                </Typography>

                {/* Descrição */}
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {job.description}
                </Typography>

                {/* Informações */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationOn sx={{ fontSize: 18, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                            {job.location}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AccessTime sx={{ fontSize: 18, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                            {formatDate(job.date)} • {formatTime(job.start_time)} - {formatTime(job.end_time)}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AttachMoney sx={{ fontSize: 18, color: 'text.secondary' }} />
                        <Typography variant="body2" fontWeight={600} color={MAR_PROFUNDO}>
                            R$ {Number(job.rate).toFixed(2)} {job.rate_type === 'Hourly' ? '/hora' : 'fixo'}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <People sx={{ fontSize: 18, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                            {slotsRemaining} {slotsRemaining === 1 ? 'vaga disponível' : 'vagas disponíveis'}
                        </Typography>
                    </Box>
                </Box>

                {/* Status Badge */}
                {job.status !== 'open' && (
                    <Chip
                        label={job.status === 'closed' ? 'Fechada' : 'Cancelada'}
                        size="small"
                        color={job.status === 'closed' ? 'default' : 'error'}
                        sx={{ mb: 2 }}
                    />
                )}
            </CardContent>

            {/* Actions */}
            {showActions && job.status === 'open' && (
                <Box sx={{ p: 2, pt: 0, display: 'flex', gap: 1 }}>
                    {onViewDetails && (
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={() => onViewDetails(job.id)}
                        >
                            Ver Detalhes
                        </Button>
                    )}
                    {onApply && slotsRemaining > 0 && (
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={() => onApply(job.id)}
                            sx={{
                                bgcolor: MAR_PROFUNDO,
                                '&:hover': { bgcolor: '#002A3C' }
                            }}
                        >
                            Candidatar
                        </Button>
                    )}
                </Box>
            )}
        </Card>
    );
}

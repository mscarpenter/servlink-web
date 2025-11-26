'use client';

import { useEffect } from 'react';
import { useNotificationsStore } from '@/stores/notificationsStore';
import {
    Box,
    Container,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    IconButton,
    Chip,
    Button,
    Divider,
    CircularProgress
} from '@mui/material';
import {
    Notifications as NotificationsIcon,
    CheckCircle as CheckCircleIcon,
    Info as InfoIcon,
    Warning as WarningIcon,
    Error as ErrorIcon,
    DoneAll as DoneAllIcon,
    Circle as CircleIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';

export default function NotificationsPage() {
    const {
        notifications,
        isLoading,
        fetchNotifications,
        markAsRead,
        markAllAsRead
    } = useNotificationsStore();

    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    const getIcon = (type: string) => {
        switch (type) {
            case 'success': return <CheckCircleIcon color="success" />;
            case 'warning': return <WarningIcon color="warning" />;
            case 'error': return <ErrorIcon color="error" />;
            default: return <InfoIcon color="info" />;
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: '#003366' }}>
                    Notificações
                </Typography>
                <Button
                    startIcon={<DoneAllIcon />}
                    onClick={() => markAllAsRead()}
                    disabled={notifications.every(n => n.is_read)}
                >
                    Marcar todas como lidas
                </Button>
            </Box>

            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                    <CircularProgress />
                </Box>
            ) : notifications.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <NotificationsIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                        Nenhuma notificação encontrada
                    </Typography>
                </Paper>
            ) : (
                <Paper elevation={2}>
                    <List sx={{ p: 0 }}>
                        {notifications.map((notification, index) => (
                            <Box key={notification.id}>
                                <ListItem
                                    alignItems="flex-start"
                                    sx={{
                                        bgcolor: notification.is_read ? 'transparent' : 'action.hover',
                                        transition: 'background-color 0.3s',
                                        '&:hover': { bgcolor: 'action.selected' }
                                    }}
                                    secondaryAction={
                                        !notification.is_read && (
                                            <IconButton edge="end" onClick={() => markAsRead(notification.id)} title="Marcar como lida">
                                                <CircleIcon sx={{ fontSize: 12, color: 'primary.main' }} />
                                            </IconButton>
                                        )
                                    }
                                >
                                    <ListItemIcon sx={{ minWidth: 40, mt: 1 }}>
                                        {getIcon(notification.type)}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pr: 2 }}>
                                                <Typography variant="subtitle1" component="span" sx={{ fontWeight: notification.is_read ? 'normal' : 'bold' }}>
                                                    {notification.title}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap', ml: 2 }}>
                                                    {format(new Date(notification.created_at), "d 'de' MMMM 'às' HH:mm", { locale: ptBR })}
                                                </Typography>
                                            </Box>
                                        }
                                        secondary={
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                                sx={{ display: 'block', mt: 0.5 }}
                                            >
                                                {notification.message}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                                {index < notifications.length - 1 && <Divider component="li" />}
                            </Box>
                        ))}
                    </List>
                </Paper>
            )}
        </Container>
    );
}

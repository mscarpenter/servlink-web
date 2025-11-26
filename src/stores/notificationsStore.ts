import { create } from 'zustand';
import { Notification, notificationsApi } from '@/lib/api/notifications';

interface NotificationsState {
    notifications: Notification[];
    unreadCount: number;
    isLoading: boolean;
    error: string | null;

    fetchNotifications: () => Promise<void>;
    fetchUnreadCount: () => Promise<void>;
    markAsRead: (id: number) => Promise<void>;
    markAllAsRead: () => Promise<void>;
}

export const useNotificationsStore = create<NotificationsState>((set, get) => ({
    notifications: [],
    unreadCount: 0,
    isLoading: false,
    error: null,

    fetchNotifications: async () => {
        set({ isLoading: true, error: null });
        try {
            const notifications = await notificationsApi.getAll();
            set({ notifications, isLoading: false });
            // Update unread count based on fetched notifications
            const unread = notifications.filter(n => !n.is_read).length;
            set({ unreadCount: unread });
        } catch (error) {
            set({ error: 'Erro ao carregar notificações', isLoading: false });
        }
    },

    fetchUnreadCount: async () => {
        try {
            const { count } = await notificationsApi.getUnreadCount();
            set({ unreadCount: count });
        } catch (error) {
            console.error('Erro ao buscar contagem de notificações', error);
        }
    },

    markAsRead: async (id: number) => {
        try {
            await notificationsApi.markAsRead(id);
            set(state => ({
                notifications: state.notifications.map(n =>
                    n.id === id ? { ...n, is_read: true, read_at: new Date().toISOString() } : n
                ),
                unreadCount: Math.max(0, state.unreadCount - 1)
            }));
        } catch (error) {
            console.error('Erro ao marcar notificação como lida', error);
        }
    },

    markAllAsRead: async () => {
        try {
            await notificationsApi.markAllAsRead();
            set(state => ({
                notifications: state.notifications.map(n => ({ ...n, is_read: true, read_at: new Date().toISOString() })),
                unreadCount: 0
            }));
        } catch (error) {
            console.error('Erro ao marcar todas como lidas', error);
        }
    },
}));

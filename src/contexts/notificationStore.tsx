import { create } from 'zustand';
import { mockNotifications } from '@/mock/data';

type Notification = (typeof mockNotifications)[number]

interface NotificationStore {
  notifications: Notification[]
  getNotifications: (id: string) => Notification | undefined
  addNotification: (notification: Notification) => void
  removeNotification: (id: string) => void
  updateNotification: (updated: Notification) => void
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: mockNotifications,

  getNotifications: (id: string) => {
    return get().notifications.find((n) => n.id === id);
  },

  addNotification: (notification: Notification) => {
    set((state) => ({ notifications: [...state.notifications, notification] }));
  },

  removeNotification: (id: string) => {
    set((state) => ({ notifications: state.notifications.filter((n) => n.id !== id) }));
  },

  updateNotification: (updated) => {
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === updated.id ? updated : n)),
    }));
  },
}))
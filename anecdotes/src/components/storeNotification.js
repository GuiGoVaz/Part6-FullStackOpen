import { create } from "zustand";

const useNotificationStore = create((set) => ({
  notification: "",
  actions: {
    setNotification: (value) => set(() => ({ notification: value })),
  },
}));

export const useNotification = () =>
  useNotificationStore((state) => state.notification);
export const useNotificationActions = () =>
  useNotificationStore((state) => state.actions);

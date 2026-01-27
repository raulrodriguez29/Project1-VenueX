import api from "./axios.config";
import type { Notification } from "../types/Notification";

export const getAllNotifications = () =>
  api.get<Notification[]>(`/user/notifications`);

export const deleteNotification = (notificationId: number) =>
  api.delete<Notification>(`/user/notifications/${notificationId}`);

const SERVICE_WORKER_URL = "/sw.js";
const NOTIFICATION_TIMEOUT_MS = 4500;

export type NotificationPayload = {
  title: string;
  body: string;
  tag?: string;
  url?: string;
};

export type InAppNotification = NotificationPayload & {
  id: string;
  durationMs: number;
  createdAt: number;
};

const isBrowser = typeof window !== "undefined";
const notificationListeners = new Set<
  (notification: InAppNotification) => void
>();

const createNotificationId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

const emitInAppNotification = (notification: InAppNotification) => {
  notificationListeners.forEach((listener) => listener(notification));
};

const supportsNotifications = () =>
  isBrowser &&
  "Notification" in window &&
  "serviceWorker" in navigator;

export const registerNotificationServiceWorker = async () => {
  if (!supportsNotifications()) {
    return null;
  }

  try {
    return await navigator.serviceWorker.register(SERVICE_WORKER_URL);
  } catch (error) {
    console.error("Unable to register the notification service worker.", error);
    return null;
  }
};

export const requestNotificationPermission = async () => {
  if (!supportsNotifications()) {
    return "denied" as NotificationPermission;
  }

  if (Notification.permission === "granted") {
    return Notification.permission;
  }

  return Notification.requestPermission();
};

const getServiceWorkerRegistration = async () => {
  const existingRegistration = await navigator.serviceWorker.getRegistration();

  if (existingRegistration) {
    return existingRegistration;
  }

  return registerNotificationServiceWorker();
};

export const subscribeToNotifications = (
  listener: (notification: InAppNotification) => void,
) => {
  notificationListeners.add(listener);

  return () => {
    notificationListeners.delete(listener);
  };
};

export const showLocalNotification = async ({
  title,
  body,
  tag,
  url = "/dashboard",
}: NotificationPayload) => {
  emitInAppNotification({
    id: createNotificationId(),
    title,
    body,
    tag,
    url,
    durationMs: NOTIFICATION_TIMEOUT_MS,
    createdAt: Date.now(),
  });

  return true;
};

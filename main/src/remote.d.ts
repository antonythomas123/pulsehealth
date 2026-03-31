declare module "auth/Login"
declare module "auth/Register"
declare module "auth/redux/auth" {
  const reducer: import("@reduxjs/toolkit").Reducer;
  export default reducer;
  export const clearAuthError: () => any;
  export const initializeAuth: () => any;
  export const signInWithEmail: (payload: {
    email: string;
    password: string;
  }) => any;
  export const signOutUser: () => any;
  export const selectCurrentUser: (state: any) => {
    uid: string;
    email: string | null;
    displayName: string | null;
  } | null;
  export const selectAuthInitialized: (state: any) => boolean;
  export const selectIsAuthenticated: (state: any) => boolean;
  export const selectAuthLoading: (state: any) => boolean;
  export const selectAuthError: (state: any) => string | null;
}
declare module "main/notifications" {
  export type InAppNotification = {
    id: string;
    title: string;
    body: string;
    tag?: string;
    url?: string;
    durationMs: number;
    createdAt: number;
  };
  export const registerNotificationServiceWorker: () => Promise<ServiceWorkerRegistration | null>;
  export const requestNotificationPermission: () => Promise<NotificationPermission>;
  export const subscribeToNotifications: (
    listener: (notification: InAppNotification) => void,
  ) => () => void;
  export const showLocalNotification: (payload: {
    title: string;
    body: string;
    tag?: string;
    url?: string;
  }) => Promise<boolean>;
}
declare module "dashboard/Dashboard"
declare module "patients/Patients"
declare module "analytics/Analytics"

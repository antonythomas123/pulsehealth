declare module "auth/Login"
declare module "auth/Register"
declare module "auth/redux/auth" {
  const reducer: import("@reduxjs/toolkit").Reducer;
  export default reducer;
  export const clearAuthError: () => any;
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
  export const selectIsAuthenticated: (state: any) => boolean;
  export const selectAuthLoading: (state: any) => boolean;
  export const selectAuthError: (state: any) => string | null;
}
declare module "dashboard/Dashboard"
declare module "patients/Patients"
declare module "analytics/Analytics"

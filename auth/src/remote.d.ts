declare module "main/components" {
  export const TextField: import("react").ComponentType<any>;
  export const Select: import("react").ComponentType<any>;
  export const Loader: import("react").ComponentType<any>;
}

declare module "main/redux/hooks" {
  export const useAppDispatch: () => any;
  export const useAppSelector: <TSelected>(selector: (state: any) => TSelected) => TSelected;
}

declare module "main/redux/auth" {
  export const clearAuthError: () => any;
  export const selectAuthError: (state: any) => string | null;
  export const selectAuthLoading: (state: any) => boolean;
  export const signInWithEmail: (payload: {
    email: string;
    password: string;
  }) => any;
}

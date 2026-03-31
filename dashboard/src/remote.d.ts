declare module "main/components" {
  export const Card: import("react").ComponentType<any>;
}

declare module "main/redux/hooks" {
  export const useAppSelector: <TSelected>(
    selector: (state: any) => TSelected,
  ) => TSelected;
}

declare module "auth/redux/auth" {
  export const selectCurrentUser: (state: any) => {
    uid: string;
    email: string | null;
    displayName: string | null;
  } | null;
}

declare module "main/components" {
  export const TextField: import("react").ComponentType<any>;
  export const Select: import("react").ComponentType<any>;
  export const Button: import("react").ComponentType<any>;
  export const Loader: import("react").ComponentType<any>;
}

declare module "main/redux/hooks" {
  export const useAppDispatch: () => any;
  export const useAppSelector: <TSelected>(selector: (state: any) => TSelected) => TSelected;
}

declare module "main/redux/storeRegistry" {
  export const storeRegistry: {
    registerModule: (
      namespace: string,
      reducer: import("@reduxjs/toolkit").Reducer,
    ) => void;
  };
}

declare module "main/notifications" {
  export const showLocalNotification: (payload: {
    title: string;
    body: string;
    tag?: string;
    url?: string;
  }) => Promise<boolean>;
}

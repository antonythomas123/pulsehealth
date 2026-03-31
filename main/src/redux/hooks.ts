import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Responsive UI Selectors
export const selectIsMobileSidebarOpen = (state: RootState) =>
  state.responsiveUI?.isMobileSidebarOpen ?? false;

export const selectResponsiveUI = (state: RootState) => state.responsiveUI;

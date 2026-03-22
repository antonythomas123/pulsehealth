import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ResponsiveUIState {
  isMobileSidebarOpen: boolean;
}

const initialState: ResponsiveUIState = {
  isMobileSidebarOpen: false,
};

const responsiveUISlice = createSlice({
  name: 'responsiveUI',
  initialState,
  reducers: {
    toggleMobileSidebar: (state) => {
      state.isMobileSidebarOpen = !state.isMobileSidebarOpen;
    },
    openMobileSidebar: (state) => {
      state.isMobileSidebarOpen = true;
    },
    closeMobileSidebar: (state) => {
      state.isMobileSidebarOpen = false;
    },
  },
});

export const { toggleMobileSidebar, openMobileSidebar, closeMobileSidebar } =
  responsiveUISlice.actions;

export default responsiveUISlice.reducer;

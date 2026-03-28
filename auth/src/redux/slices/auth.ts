import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import { storeRegistry } from "main/redux/storeRegistry";
import { auth } from "../../configs/firebase.config";
import {
  FirebaseUser,
  getAuthErrorMessage,
  registerWithEmail,
  signInWithEmail,
  signOutUser,
  toFirebaseUser,
} from "../thunks/auth";

type AuthState = {
  user: FirebaseUser | null;
  isAuthenticated: boolean;
  initialized: boolean;
  loading: boolean;
  error: string | null;
};

type RootStateWithAuth = {
  auth?: AuthState;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  initialized: false,
  loading: false,
  error: null,
};

let authStateUnsubscribe: (() => void) | null = null;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<FirebaseUser | null>) => {
      state.user = action.payload;
      state.isAuthenticated = Boolean(action.payload);
      state.initialized = true;
      state.loading = false;
      state.error = null;
    },
    setAuthError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.initialized = true;
      state.loading = false;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInWithEmail.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(signInWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Invalid email or password.";
      })
      .addCase(registerWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerWithEmail.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(registerWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unable to create your account right now.";
      })
      .addCase(signOutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unable to sign out right now.";
      });
  },
});

export const initializeAuth = () => (dispatch: (action: unknown) => unknown) => {
  if (authStateUnsubscribe) {
    return authStateUnsubscribe;
  }

  authStateUnsubscribe = onAuthStateChanged(
    auth,
    (user) => {
      dispatch(setAuthState(user ? toFirebaseUser(user) : null));
    },
    (error) => {
      dispatch(setAuthError(getAuthErrorMessage(error)));
    },
  );

  return authStateUnsubscribe;
};

export const stopAuthInitialization = () => () => {
  if (authStateUnsubscribe) {
    authStateUnsubscribe();
    authStateUnsubscribe = null;
  }
};

export const { setAuthState, setAuthError, clearAuthError } = authSlice.actions;

export { registerWithEmail, signInWithEmail, signOutUser } from "../thunks/auth";

export const selectAuth = (state: RootStateWithAuth) => state.auth;
export const selectCurrentUser = (state: RootStateWithAuth) =>
  selectAuth(state)?.user ?? null;
export const selectIsAuthenticated = (state: RootStateWithAuth) =>
  selectAuth(state)?.isAuthenticated ?? false;
export const selectAuthInitialized = (state: RootStateWithAuth) =>
  selectAuth(state)?.initialized ?? false;
export const selectAuthLoading = (state: RootStateWithAuth) =>
  selectAuth(state)?.loading ?? false;
export const selectAuthError = (state: RootStateWithAuth) =>
  selectAuth(state)?.error ?? null;

storeRegistry.registerModule("auth", authSlice.reducer);

export default authSlice.reducer;

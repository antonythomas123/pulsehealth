import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { onIdTokenChanged, signOut } from "firebase/auth";
import { storeRegistry } from "main/redux/storeRegistry";
import { auth } from "../../configs/firebase.config";
import {
  clearAuthSession,
  clearSessionExpiryTimer,
  consumeSessionReasonMessage,
  isSessionExpired,
  loadAuthSessionMeta,
  markSessionExpired,
  persistAuthSession,
  scheduleSessionExpiry,
  SESSION_EXPIRED_MESSAGE,
} from "../authSession";
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
  sessionExpired: boolean;
  sessionMessage: string | null;
};

type RootStateWithAuth = {
  auth?: AuthState;
};

type AuthPayload = {
  user: FirebaseUser | null;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  initialized: false,
  loading: false,
  error: null,
  sessionExpired: false,
  sessionMessage: null,
};

let authStateUnsubscribe: (() => void) | null = null;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<AuthPayload>) => {
      state.user = action.payload.user;
      state.isAuthenticated = Boolean(action.payload.user);
      state.initialized = true;
      state.loading = false;
      state.error = null;
      state.sessionExpired = false;
      state.sessionMessage = null;
    },
    setAuthError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.initialized = true;
      state.loading = false;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
    clearSessionMessage: (state) => {
      state.sessionExpired = false;
      state.sessionMessage = null;
    },
    setSessionExpired: (state, action: PayloadAction<string>) => {
      state.user = null;
      state.isAuthenticated = false;
      state.initialized = true;
      state.loading = false;
      state.error = null;
      state.sessionExpired = true;
      state.sessionMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.sessionExpired = false;
        state.sessionMessage = null;
      })
      .addCase(signInWithEmail.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
        state.sessionExpired = false;
        state.sessionMessage = null;
      })
      .addCase(signInWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Invalid email or password.";
      })
      .addCase(registerWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.sessionExpired = false;
        state.sessionMessage = null;
      })
      .addCase(registerWithEmail.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
        state.sessionExpired = false;
        state.sessionMessage = null;
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
        state.sessionExpired = false;
        state.sessionMessage = null;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unable to sign out right now.";
      });
  },
});

export const expireSession =
  () => async (dispatch: (action: unknown) => unknown) => {
    clearSessionExpiryTimer();
    markSessionExpired();
    clearAuthSession(true);
    dispatch(setSessionExpired(SESSION_EXPIRED_MESSAGE));

    try {
      await signOut(auth);
    } catch {
      // The local session has already been cleared. Keep the expiry UX intact.
    }
  };

export const initializeAuth = () => (dispatch: (action: unknown) => unknown) => {
  if (authStateUnsubscribe) {
    return authStateUnsubscribe;
  }

  authStateUnsubscribe = onIdTokenChanged(
    auth,
    async (user) => {
      if (user) {
        const existingSession = loadAuthSessionMeta();

        if (existingSession && isSessionExpired(existingSession.expiresAt)) {
          markSessionExpired();
          clearSessionExpiryTimer();
          dispatch(setSessionExpired(SESSION_EXPIRED_MESSAGE));
          await signOut(auth);
          return;
        }

        try {
          const sessionMeta = await persistAuthSession(user);
          scheduleSessionExpiry(sessionMeta.expiresAt, () => {
            dispatch(expireSession());
          });

          dispatch(
            setAuthState({
              user: toFirebaseUser(user),
            }),
          );
        } catch (error) {
          clearSessionExpiryTimer();
          clearAuthSession();
          dispatch(setAuthError(getAuthErrorMessage(error)));
        }

        return;
      }

      clearSessionExpiryTimer();

      const sessionReasonMessage = consumeSessionReasonMessage();
      clearAuthSession();

      if (sessionReasonMessage) {
        dispatch(setSessionExpired(sessionReasonMessage));
        return;
      }

      dispatch(
        setAuthState({
          user: null,
        }),
      );
    },
    (error) => {
      clearSessionExpiryTimer();
      clearAuthSession();
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

  clearSessionExpiryTimer();
};

export const {
  setAuthState,
  setAuthError,
  clearAuthError,
  clearSessionMessage,
  setSessionExpired,
} = authSlice.actions;

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
export const selectSessionExpired = (state: RootStateWithAuth) =>
  selectAuth(state)?.sessionExpired ?? false;
export const selectSessionMessage = (state: RootStateWithAuth) =>
  selectAuth(state)?.sessionMessage ?? null;

storeRegistry.registerModule("auth", authSlice.reducer);

export default authSlice.reducer;

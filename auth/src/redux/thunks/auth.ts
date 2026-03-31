import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { auth } from "../../configs/firebase.config";
import { persistAuthSessionFromCredential } from "../authSession";

export type FirebaseUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type RegisterCredentials = {
  email: string;
  password: string;
  fullName: string;
};

export const toFirebaseUser = (user: User): FirebaseUser => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
});

export const getAuthErrorMessage = (error: unknown) => {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string"
  ) {
    if (error.code === "auth/invalid-credential") {
      return "Invalid Credentials";
    }

    if (error.code === "auth/email-already-in-use") {
      return "An account already exists for this email.";
    }

    if (error.code === "auth/weak-password") {
      return "Password should be at least 6 characters.";
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unable to authenticate right now. Please try again.";
};

export const signInWithEmail = createAsyncThunk<
  FirebaseUser,
  SignInCredentials,
  { rejectValue: string }
>("auth/signInWithEmail", async ({ email, password }, thunkAPI) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    persistAuthSessionFromCredential(userCredential);
    return toFirebaseUser(userCredential.user);
  } catch (error) {
    return thunkAPI.rejectWithValue(getAuthErrorMessage(error));
  }
});

export const registerWithEmail = createAsyncThunk<
  FirebaseUser,
  RegisterCredentials,
  { rejectValue: string }
>("auth/registerWithEmail", async ({ email, password, fullName }, thunkAPI) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    await updateProfile(userCredential.user, {
      displayName: fullName,
    });

    persistAuthSessionFromCredential(userCredential);

    return {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: fullName,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(getAuthErrorMessage(error));
  }
});

export const signOutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/signOutUser",
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
    } catch (error) {
      return thunkAPI.rejectWithValue(getAuthErrorMessage(error));
    }
  },
);

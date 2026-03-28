import React, { useEffect, useState } from "react";
import {
  MdHealthAndSafety,
  MdOutlineError,
  MdEmail,
  MdLock,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
} from "react-icons/md";
import { TextField, Button } from "main/components";
import { useAppDispatch, useAppSelector } from "main/redux/hooks";
import {
  clearAuthError,
  selectAuthError,
  selectAuthLoading,
  signInWithEmail,
} from "../redux/slices/auth";
import { Link } from "react-router-dom";

type Props = {};

const LoginForm = (props: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();
  const authError = useAppSelector(selectAuthError);
  const isLoading = useAppSelector(selectAuthLoading);
  const isInvalid = Boolean(authError);

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const clearErrorIfNeeded = () => {
    if (authError) {
      dispatch(clearAuthError());
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await dispatch(
      signInWithEmail({
        email: email.trim(),
        password,
      }),
    );
  };

  return (
    <section className="w-full lg:w-[45%] bg-white flex items-center justify-center p-6 sm:p-12 lg:p-24 overflow-y-auto">
      <div className="w-full max-w-[420px]">
        <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
          <div className="w-10 h-10 signature-gradient rounded-xl flex items-center justify-center text-white">
            <MdHealthAndSafety className="text-[24px]" />
          </div>
          <h1 className="font-headline text-xl font-800 tracking-tight text-on-surface">
            PulseHealth
          </h1>
        </div>
        <header className="mb-8">
          <h3 className="font-headline text-2xl font-800 text-on-surface mb-2">
            Welcome Back
          </h3>
          <p className="text-on-surface-variant text-sm font-semibold tracking-wide opacity-80 uppercase">
            Clinical Curator Access
          </p>
        </header>

        {isInvalid && (
          <div className="w-full mb-8 flex items-center space-x-3 bg-red-50/80 px-4 py-3.5 rounded-xl border border-red-100">
            <MdOutlineError className="text-red-600 text-[20px] font-bold" />

            <span className="text-red-700 text-xs font-bold font-headline uppercase tracking-wider">
              {authError}
            </span>
          </div>
        )}

        <form
          className="w-full space-y-6"
          id="login_form"
          onSubmit={handleSubmit}
        >
          <TextField
            label="Email"
            placeholder="johndoe@gmail.com"
            type="email"
            startIcon={<MdEmail className="text-[20px]" />}
            value={email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              clearErrorIfNeeded();
              setEmail(event.target.value);
            }}
          />

          <div className="flex flex-col gap-2">
            <TextField
              label="Password"
              placeholder="••••••••"
              type={isPasswordVisible ? "text" : "password"}
              startIcon={<MdLock className="text-[20px]" />}
              endIcon={
                isPasswordVisible ? (
                  <MdOutlineVisibilityOff className="text-[20px]" />
                ) : (
                  <MdOutlineVisibility className="text-[20px]" />
                )
              }
              endIconClick={() =>
                setIsPasswordVisible((prev: boolean) => !prev)
              }
              value={password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                clearErrorIfNeeded();
                setPassword(event.target.value);
              }}
            />
            <a
              className="text-primary text-end text-[11px] font-bold font-headline uppercase tracking-wider hover:text-primary-container transition-colors"
              href="#"
            >
              Forgot Password?
            </a>
          </div>

          <Button
            fullWidth
            type="submit"
            form="login_form"
            disabled={!email || !password}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <footer className="pt-6 border-t border-surface-variant/50 w-full text-center">
          <p className="text-on-surface-variant/70 text-xs font-medium">
            New to PulseHealth?
            <Link
              className="text-primary font-bold hover:underline ml-1"
              to={"/register"}
            >
              Create account
            </Link>
          </p>
        </footer>
      </div>
    </section>
  );
};

export default LoginForm;

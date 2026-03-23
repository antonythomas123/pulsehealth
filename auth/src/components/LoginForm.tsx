import React, { useState } from "react";
import {
  MdHealthAndSafety,
  MdOutlineError,
  MdEmail,
  MdLock,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
} from "react-icons/md";
import { TextField } from "main/components";

type Props = {};

const LoginForm = (props: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

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
              Invalid credentials
            </span>
          </div>
        )}

        <form className="w-full space-y-6" id="login_form">
          <TextField
            label="Email"
            placeholder="johndoe@gmail.com"
            type="text"
            startIcon={<MdEmail className="text-[20px]" />}
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
              endIconClick={() => setIsPasswordVisible((prev) => !prev)}
            />
            <a
              className="text-primary text-end text-[11px] font-bold font-headline uppercase tracking-wider hover:text-primary-container transition-colors"
              href="#"
            >
              Forgot Password?
            </a>
          </div>

          <button
            className="w-full signature-gradient text-on-primary py-4 rounded-xl font-headline font-bold text-sm tracking-wide shadow-xl shadow-primary/25 hover:shadow-primary/35 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 mt-2"
            type="submit"
            form="login_form"
          >
            Sign In
          </button>
        </form>

        <footer className="pt-6 border-t border-surface-variant/50 w-full text-center">
          <p className="text-on-surface-variant/70 text-xs font-medium">
            New to PulseHealth?
            <a className="text-primary font-bold hover:underline ml-1" href="#">
              Create account
            </a>
          </p>
        </footer>
      </div>
    </section>
  );
};

export default LoginForm;

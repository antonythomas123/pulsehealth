import React from "react";
import { MdHealthAndSafety } from "react-icons/md";
import LoginForm from "../components/LoginForm";

type Props = {};

const Login = (props: Props) => {
  return (
    <div className="flex min-h-screen">
      <section className="hidden lg:flex lg:w-[55%] relative overflow-hidden items-center justify-center p-16 brand-bg-solid">
        <div className="relative z-10 w-full max-w-2xl flex flex-col h-full justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-lg">
              <MdHealthAndSafety className="text-[28px]" />
            </div>
            <h1 className="font-headline text-2xl font-800 tracking-tight text-white">
              PulseHealth
            </h1>
          </div>

          <div className="space-y-6">
            <h2 className="font-headline text-5xl xl:text-6xl font-800 text-white leading-tight">
              Revolutionizing Patient Care with{" "}
              <span className="text-secondary-fixed">Precision.</span>
            </h2>
            <p className="text-white/80 text-lg max-w-lg leading-relaxed font-medium">
              The world's leading clinical curation platform empowering
              healthcare providers with AI-driven insights and secure data
              management.
            </p>
          </div>
        </div>
      </section>

      <LoginForm />
    </div>
  );
};

export default Login;

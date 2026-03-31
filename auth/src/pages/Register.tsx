import React from "react";
import { MdHealthAndSafety } from "react-icons/md";
import RegistrationForm from "../components/RegistrationForm";

type Props = {};

const Register = (props: Props) => {
  return (
    <div className="flex min-h-screen">
      <section className="hidden md:flex md:w-5/12 signature-gradient p-16 flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-lg">
              <MdHealthAndSafety className="text-[28px]" />
            </div>
            <h1 className="font-headline text-2xl font-800 tracking-tight text-white">
              PulseHealth
            </h1>
          </div>
        </div>
        <div className="relative z-10 max-w-md">
          <h1 className="font-headline text-5xl font-bold text-white leading-tight mb-6">
            Join the Clinical Curator Community.
          </h1>
          <p className="text-on-primary-container text-lg font-medium opacity-90 leading-relaxed">
            Empowering healthcare institutions with data-driven clinical
            insights.
          </p>
        </div>

        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-20 w-64 h-64 bg-primary-fixed/10 rounded-full blur-2xl"></div>
      </section>

      <RegistrationForm />
    </div>
  );
};

export default Register;

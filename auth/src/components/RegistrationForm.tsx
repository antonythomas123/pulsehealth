import React, { useState } from "react";
import {
  MdEmail,
  MdLock,
  MdHealthAndSafety,
  MdOutlinePerson,
  MdOutlineVisibilityOff,
  MdOutlineVisibility,
} from "react-icons/md";
import { TextField, Select } from "main/components";
import { Link } from "react-router-dom";

type Props = {};

const specializations = [
  { label: "Cardiology", value: "CARDIOLOGY" },
  { label: "Neurology", value: "NEUROLOGY" },
  { label: "Pediatrics", value: "PEDIATRICS" },
  { label: "Oncology", value: "ONCOLOGY" },
  { label: "Radiology", value: "RADIOLOGY" },
  { label: "General Practice", value: "GENERAL_PRACTICE" },
];

const RegistrationForm = (props: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPassVisible, setIsConfirmPassVisible] =
    useState<boolean>(false);

  return (
    <section className="relative z-20 flex-1 h-screen overflow-hidden bg-surface-container-lowest shadow-xl md:-ml-8 md:rounded-l-[2rem]">
      <div className="flex h-full w-full justify-center px-8 py-8 md:px-12 md:py-16 lg:px-24">
        <div className="flex h-full w-full max-w-lg min-h-0 flex-col">
          <div className="mb-4 shrink-0">
            <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
              <div className="w-10 h-10 signature-gradient rounded-xl flex items-center justify-center text-white">
                <MdHealthAndSafety className="text-[24px]" />
              </div>
              <h1 className="font-headline text-xl font-800 tracking-tight text-on-surface">
                PulseHealth
              </h1>
            </div>
            <h2 className="font-headline text-2xl font-bold text-on-surface mb-2">
              Create Account
            </h2>
            <p className="text-on-surface-variant font-sm">
              Please provide your professional credentials to begin.
            </p>
          </div>

          <div className="min-h-0 flex-1">
            <form className="space-y-2">
              <TextField
                label="Full Name"
                placeholder="John Doe"
                type="text"
                startIcon={<MdOutlinePerson className="text-[20px]" />}
              />

              <TextField
                label="Email"
                placeholder="johndoe@gmail.com"
                type="email"
                startIcon={<MdEmail className="text-[20px]" />}
              />

              <Select
                label="Clinical Specialization"
                options={specializations}
              />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                />

                <TextField
                  label="Confirm Password"
                  placeholder="••••••••"
                  type={isConfirmPassVisible ? "text" : "password"}
                  startIcon={<MdLock className="text-[20px]" />}
                  endIcon={
                    isConfirmPassVisible ? (
                      <MdOutlineVisibilityOff className="text-[20px]" />
                    ) : (
                      <MdOutlineVisibility className="text-[20px]" />
                    )
                  }
                  endIconClick={() =>
                    setIsConfirmPassVisible((prev: boolean) => !prev)
                  }
                />
              </div>

              <button
                className="w-full signature-gradient text-on-primary py-4 rounded-xl font-headline font-bold text-sm tracking-wide hover:shadow-primary/35 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 mt-2 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                type="submit"
              >
                Sign Up
              </button>
            </form>
          </div>

          <div className="mt-6 flex justify-center border-t border-surface-container pt-8 shrink-0">
            <p className="text-on-surface-variant/70 text-xs font-medium">
              Already have an account?
              <Link
                className="ml-1 font-bold text-primary hover:underline"
                to="/login"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;

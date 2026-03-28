import React, { useState } from "react";
import {
  MdEmail,
  MdLock,
  MdHealthAndSafety,
  MdOutlineError,
  MdOutlinePerson,
  MdOutlineVisibilityOff,
  MdOutlineVisibility,
} from "react-icons/md";
import { TextField, Select, Button } from "main/components";
import { useAppDispatch, useAppSelector } from "main/redux/hooks";
import { Link } from "react-router-dom";
import {
  clearAuthError,
  registerWithEmail,
  selectAuthError,
  selectAuthLoading,
} from "../redux/slices/auth";

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
  const [localError, setLocalError] = useState<string | null>(null);
  const [fields, setFields] = useState({
    fullName: "",
    email: "",
    specialization: "",
    password: "",
    confirmPass: "",
  });
  const dispatch = useAppDispatch();
  const authError = useAppSelector(selectAuthError);
  const isLoading = useAppSelector(selectAuthLoading);
  const formError = localError ?? authError;
  const isInvalid = Boolean(formError);

  const clearErrorIfNeeded = () => {
    if (localError) {
      setLocalError(null);
    }

    if (authError) {
      dispatch(clearAuthError());
    }
  };

  const updateField =
    (field: keyof typeof fields) =>
    (eventOrValue: React.ChangeEvent<HTMLInputElement> | string) => {
      clearErrorIfNeeded();

      const value =
        typeof eventOrValue === "string"
          ? eventOrValue
          : eventOrValue.target.value;

      setFields((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedFullName = fields.fullName.trim();
    const normalizedEmail = fields.email.trim();

    if (fields.password !== fields.confirmPass) {
      setLocalError("Passwords do not match.");
      return;
    }

    if (fields.password.length < 6) {
      setLocalError("Password should be at least 6 characters.");
      return;
    }

    await dispatch(
      registerWithEmail({
        fullName: normalizedFullName,
        email: normalizedEmail,
        password: fields.password,
      }),
    );
  };

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
            {isInvalid && (
              <div className="w-full mb-6 flex items-center space-x-3 bg-red-50/80 px-4 py-3.5 rounded-xl border border-red-100">
                <MdOutlineError className="text-red-600 text-[20px] font-bold" />
                <span className="text-red-700 text-xs font-bold font-headline uppercase tracking-wider">
                  {formError}
                </span>
              </div>
            )}

            <form className="space-y-3" id="register-form" onSubmit={handleSubmit}>
              <TextField
                label="Full Name"
                placeholder="John Doe"
                type="text"
                startIcon={<MdOutlinePerson className="text-[20px]" />}
                value={fields?.fullName || ""}
                onChange={updateField("fullName")}
              />

              <TextField
                label="Email"
                placeholder="johndoe@gmail.com"
                type="email"
                startIcon={<MdEmail className="text-[20px]" />}
                value={fields?.email || ""}
                onChange={updateField("email")}
              />

              <Select
                label="Clinical Specialization"
                options={specializations}
                value={fields?.specialization || ""}
                onChange={updateField("specialization")}
                placeholder="Select specialization"
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
                  value={fields?.password || ""}
                  onChange={updateField("password")}
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
                  value={fields?.confirmPass || ""}
                  onChange={updateField("confirmPass")}
                />
              </div>

              <Button
                type="submit"
                form="register-form"
                fullWidth
                loading={isLoading}
                disabled={
                  !fields?.fullName ||
                  !fields?.email ||
                  !fields?.specialization ||
                  !fields?.password ||
                  !fields?.confirmPass
                }
              >
                {isLoading ? "Creating Account..." : "Sign Up"}
              </Button>
            </form>

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
      </div>
    </section>
  );
};

export default RegistrationForm;

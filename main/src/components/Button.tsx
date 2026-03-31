import React from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-tight transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary/10 disabled:pointer-events-none disabled:opacity-60";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "clinical-gradient text-on-primary shadow-md shadow-primary/15 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]",
  secondary:
    "bg-surface-container text-on-surface border border-outline-variant/40 hover:bg-surface-container-high active:scale-[0.98]",
  outline:
    "bg-surface-container-lowest text-primary border border-primary/20 hover:bg-primary/5 hover:border-primary/35 active:scale-[0.98]",
  ghost:
    "bg-transparent text-on-surface-variant hover:bg-surface-container-low active:scale-[0.98]",
  danger:
    "bg-error text-on-error shadow-md shadow-error/15 hover:brightness-95 active:scale-[0.98]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3.5 text-sm",
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-6 text-base",
};

const spinnerSizeClasses: Record<ButtonSize, string> = {
  sm: "h-3.5 w-3.5 border-2",
  md: "h-4 w-4 border-2",
  lg: "h-[18px] w-[18px] border-2",
};

const Button = ({
  children,
  className = "",
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled,
  startIcon,
  endIcon,
  type = "button",
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={loading}
      className={[
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
      {...props}
    >
      {loading ? (
        <span
          aria-hidden="true"
          className={`inline-block animate-spin rounded-full border-current border-t-transparent ${spinnerSizeClasses[size]}`}
        />
      ) : (
        startIcon && <span className="shrink-0">{startIcon}</span>
      )}
      <span>{children}</span>
      {!loading && endIcon && <span className="shrink-0">{endIcon}</span>}
    </button>
  );
};

export default Button;

import React from "react";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size = "md",
  fullScreen = false,
  message,
}) => {
  const sizeClasses = {
    sm: "h-8 w-8 border-[3px]",
    md: "h-12 w-12 border-4",
    lg: "h-16 w-16 border-4",
  };

  const loaderContent = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className={`animate-spin rounded-full border-slate-200/60 border-t-[#003d9b] border-r-[#0052cc] ${sizeClasses[size]}`}
      />
      {message && (
        <p className="text-sm text-on-surface-variant font-body animate-pulse">
          {message}
        </p>
      )}
    </div>
  );

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        fullScreen ? "bg-surface/80 backdrop-blur-sm" : "pointer-events-none"
      }`}
    >
      {loaderContent}
    </div>
  );
};

export default Loader;

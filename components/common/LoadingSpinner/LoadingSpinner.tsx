import React from "react";

interface LoadingSpinnerProps {
  message?: string;
  fullScreen?: boolean;
}

export const LoadingSpinner = React.memo<LoadingSpinnerProps>(
  ({ message = "Loading...", fullScreen = false }: LoadingSpinnerProps) => {
    const containerClass = fullScreen
      ? "fixed inset-0 flex items-center justify-center bg-whiteCustom z-50"
      : "flex items-center justify-center min-h-[400px] w-full";

    return (
      <div className={containerClass}>
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-[#e1e1e1] rounded-full"></div>
            <div className="absolute inset-0 border-4 border-[#1f77ff] border-t-transparent rounded-full animate-spin"></div>
          </div>
          {message && (
            <p className="text100 text-[#393939] animate-pulse">{message}</p>
          )}
        </div>
      </div>
    );
  }
);

LoadingSpinner.displayName = "LoadingSpinner";

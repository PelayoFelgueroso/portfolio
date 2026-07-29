"use client";

import React from "react";
import { Loader2 } from "lucide-react";

export const LoadingState = React.memo(() => {
  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <Loader2 className="h-8 w-8 animate-spin text-[#1f77ff]" />
    </div>
  );
});

LoadingState.displayName = "LoadingState";

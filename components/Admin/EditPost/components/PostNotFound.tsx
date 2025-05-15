"use client";

import { AlertCircle, ArrowLeft } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface PostNotFoundProps {
  handleBack: () => void;
}

export function PostNotFound({ handleBack }: PostNotFoundProps) {
  return (
    <div className="flex flex-col gap-6">
      <Alert
        variant="destructive"
        className="bg-red-50 text-red-800 border-red-200"
      >
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Post not found. It may have been deleted.
        </AlertDescription>
      </Alert>
      <Button onClick={handleBack} variant="outline" className="w-fit">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Posts
      </Button>
    </div>
  );
}

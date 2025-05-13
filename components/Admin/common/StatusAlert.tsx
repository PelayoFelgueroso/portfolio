import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Props {
  error: string | null;
  successMessage: string | null;
}

export function StatusAlert({ error, successMessage }: Props) {
  if (!error && !successMessage) return null;

  if (error) {
    return (
      <Alert
        variant="destructive"
        className="bg-red-50 text-red-800 border-red-200"
      >
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="bg-green-50 text-green-800 border-green-200">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>{successMessage}</AlertDescription>
    </Alert>
  );
}

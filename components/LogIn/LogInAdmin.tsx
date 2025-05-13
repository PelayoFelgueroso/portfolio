"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "./components/LogInForm/LogInForm";
import { LoginHeader } from "./components/LogInHeader";

export const LogInAdmin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    setError(null);

    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    setIsLoading(false);

    if (res?.error) {
      setError("Invalid credentials");
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f4f4] p-4">
      <div className="w-full max-w-md">
        <LoginHeader />

        <Card className="border-[#e1e1e1] shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl text-[#191a1b]">
              Sign In
            </CardTitle>
            <CardDescription className="text-[#949596]">
              Enter your credentials to continue
            </CardDescription>
          </CardHeader>

          <CardContent>
            <LoginForm
              onSubmit={handleLogin}
              error={error}
              isLoading={isLoading}
            />
          </CardContent>

          <CardFooter className="flex justify-center border-t border-[#e1e1e1] pt-6 text-sm text-[#949596]">
            Content Management System © {new Date().getFullYear()}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

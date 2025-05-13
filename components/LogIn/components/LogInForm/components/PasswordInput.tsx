"use client"

import { useState } from "react"
import { Eye, EyeOff, Lock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type PasswordInputProps = {
  value: string
  onChange: (value: string) => void
  error?: string
}

export function PasswordInput({ value, onChange, error }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="space-y-2">
      <Label htmlFor="password" className="text-[#393939]">
        Password
      </Label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Lock className="h-5 w-5 text-[#949596]" />
        </div>
        <Input
          type={showPassword ? "text" : "password"}
          id="password"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          placeholder="••••••••"
          className={`pl-10 border-[#e1e1e1] focus:border-[#1f77ff] focus:ring-[#1f77ff] ${
            error ? "border-red-500" : ""
          }`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#949596] hover:text-[#393939]"
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}

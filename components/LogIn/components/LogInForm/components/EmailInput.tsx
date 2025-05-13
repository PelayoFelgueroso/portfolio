"use client"

import { Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type EmailInputProps = {
  value: string
  onChange: (value: string) => void
  error?: string
}

export function EmailInput({ value, onChange, error }: EmailInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="email" className="text-[#393939]">
        Email Address
      </Label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Mail className="h-5 w-5 text-[#949596]" />
        </div>
        <Input
          type="email"
          id="email"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          placeholder="name@example.com"
          className={`pl-10 border-[#e1e1e1] focus:border-[#1f77ff] focus:ring-[#1f77ff] ${
            error ? "border-red-500" : ""
          }`}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}

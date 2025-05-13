import Link from "next/link"
import { Home } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function LoginHeader() {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center mb-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/"
                className="bg-[#1f77ff] p-3 rounded-full inline-flex items-center justify-center transition-all hover:bg-[#1a68e0] hover:shadow-md"
                aria-label="Return to home page"
              >
                <Home className="h-8 w-8 text-white" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Return to home page</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <h1 className="text-3xl font-bold text-[#1c1d21]">Admin Panel</h1>
      <p className="text-[#393939] mt-2">Sign in to access the system</p>
      <p className="text-[#6b6b6b] text-sm mt-1">
        Not an administrator?{" "}
        <Link href="/" className="text-[#1f77ff] hover:underline">
          Return to home
        </Link>
      </p>
    </div>
  )
}
